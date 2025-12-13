'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Badge,
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type EventRequest = {
  id: number;
  userId: number;
  userEmail: string;
  username: string;
  eventName: string;
  eventType: string;
  gameTitle: string;
  description: string;
  suggestedDate: string | null;
  suggestedTime: string | null;
  estimatedPlayers: number | null;
  location: string | null;
  additionalNotes: string | null;
  eventPoster: string | null;
  status: 'UNOPENED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'LIVE' | 'CLOSED' | 'IN_REVIEW';
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function AdminEventRequests() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<EventRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<EventRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedRequest, setSelectedRequest] = useState<EventRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, router]);

  // Fetch all event requests
  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchRequests();
    }
  }, [session]);

  // Filter requests when filter changes
  useEffect(() => {
    if (statusFilter === 'ALL') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter((req) => req.status === statusFilter));
    }
  }, [statusFilter, requests]);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/admin/event-requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
        setFilteredRequests(data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRequest = async (request: EventRequest) => {
    setSelectedRequest(request);
    setAdminNotes(request.adminNotes || '');
    setShowModal(true);

    // Mark as PENDING if UNOPENED
    if (request.status === 'UNOPENED') {
      try {
        await fetch(`/api/admin/event-requests/${request.id}`, {
          method: 'POST',
        });
        fetchRequests(); // Refresh the list
      } catch (error) {
        console.error('Error marking as pending:', error);
      }
    }
  };

  const handleUpdateStatus = async (newStatus: EventRequest['status']) => {
    if (!selectedRequest) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/event-requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          adminNotes,
        }),
      });

      if (response.ok) {
        fetchRequests();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: EventRequest['status']) => {
    const colors = {
      UNOPENED: '#666666',
      PENDING: '#f39c12',
      APPROVED: '#27ae60',
      REJECTED: '#e74c3c',
      LIVE: '#76b900',
      CLOSED: '#95a5a6',
      IN_REVIEW: '#3498db',
    };

    return (
      <Badge
        style={{
          backgroundColor: colors[status],
          padding: '0.5rem 1rem',
          fontSize: '0.85rem',
        }}
      >
        {status}
      </Badge>
    );
  };

  const getStatusCount = (status: string) => {
    if (status === 'ALL') return requests.length;
    return requests.filter((req) => req.status === status).length;
  };

  if (loading || status === 'loading') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner animation="border" style={{ color: '#76b900' }} />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Container>
        <h1
          className="mb-4"
          style={{
            color: '#76b900',
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(118, 185, 0, 0.5)',
          }}
        >
          Event Requests Management
        </h1>

        {/* Status Filter Buttons */}
        <Card
          className="mb-4"
          style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid #76b900',
            boxShadow: '0 4px 16px rgba(118, 185, 0, 0.2)',
          }}
        >
          <Card.Body>
            <Row className="g-2">
              {['ALL', 'UNOPENED', 'PENDING', 'APPROVED', 'LIVE', 'REJECTED', 'CLOSED'].map(
                (status) => (
                  <Col key={status} xs={6} sm={4} md={3} lg={2}>
                    <Button
                      className="w-100"
                      onClick={() => setStatusFilter(status)}
                      style={{
                        background:
                          statusFilter === status
                            ? 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)'
                            : 'transparent',
                        color: statusFilter === status ? '#0d0d0d' : '#76b900',
                        border: '1px solid #76b900',
                        fontWeight: '600',
                      }}
                    >
                      {status}
                      {' '}
(
                      {getStatusCount(status)}
)
                    </Button>
                  </Col>
                ),
              )}
            </Row>
          </Card.Body>
        </Card>

        {/* Requests Table */}
        <Card
          style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid #76b900',
            boxShadow: '0 4px 16px rgba(118, 185, 0, 0.2)',
          }}
        >
          <Card.Body>
            {filteredRequests.length === 0 ? (
              <p className="text-center" style={{ color: '#b3b3b3' }}>
                No event requests found.
              </p>
            ) : (
              <Table responsive hover variant="dark" style={{ color: '#ffffff' }}>
                <thead style={{ backgroundColor: '#76b900', color: '#0d0d0d' }}>
                  <tr>
                    <th>ID</th>
                    <th>Event Name</th>
                    <th>Game</th>
                    <th>Submitted By</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      style={{
                        backgroundColor: request.status === 'UNOPENED' ? '#2d2d2d' : '#1a1a1a',
                      }}
                    >
                      <td>{request.id}</td>
                      <td style={{ color: '#76b900', fontWeight: 'bold' }}>
                        {request.eventName}
                      </td>
                      <td>{request.gameTitle}</td>
                      <td>{request.username}</td>
                      <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                      <td>{getStatusBadge(request.status)}</td>
                      <td>
                        <Button
                          size="sm"
                          style={{
                            background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                            border: 'none',
                            color: '#0d0d0d',
                            fontWeight: '600',
                          }}
                          onClick={() => handleViewRequest(request)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Detail Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: '#1a1a1a',
            borderBottom: '2px solid #76b900',
            color: '#ffffff',
          }}
        >
          <Modal.Title style={{ color: '#76b900' }}>
            {selectedRequest?.eventName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
          {selectedRequest && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <p>
                    <strong style={{ color: '#76b900' }}>Event Type:</strong>
                    {' '}
                    {selectedRequest.eventType}
                  </p>
                  <p>
                    <strong style={{ color: '#76b900' }}>Game:</strong>
                    {' '}
                    {selectedRequest.gameTitle}
                  </p>
                  <p>
                    <strong style={{ color: '#76b900' }}>Submitted By:</strong>
                    {' '}
                    {selectedRequest.username}
                    {' '}
(
                    {selectedRequest.userEmail}
)
                  </p>
                  <p>
                    <strong style={{ color: '#76b900' }}>Status:</strong>
                    {' '}
                    {getStatusBadge(selectedRequest.status)}
                  </p>
                </Col>
                <Col md={6}>
                  {selectedRequest.suggestedDate && (
                    <p>
                      <strong style={{ color: '#76b900' }}>Date:</strong>
                      {' '}
                      {new Date(selectedRequest.suggestedDate).toLocaleDateString()}
                    </p>
                  )}
                  {selectedRequest.suggestedTime && (
                    <p>
                      <strong style={{ color: '#76b900' }}>Time:</strong>
                      {' '}
                      {selectedRequest.suggestedTime}
                    </p>
                  )}
                  {selectedRequest.estimatedPlayers && (
                    <p>
                      <strong style={{ color: '#76b900' }}>Players:</strong>
                      {' '}
                      {selectedRequest.estimatedPlayers}
                    </p>
                  )}
                  {selectedRequest.location && (
                    <p>
                      <strong style={{ color: '#76b900' }}>Location:</strong>
                      {' '}
                      {selectedRequest.location}
                    </p>
                  )}
                </Col>
              </Row>

              <div className="mb-3">
                <strong style={{ color: '#76b900' }}>Description:</strong>
                <p style={{ color: '#b3b3b3', marginTop: '0.5rem' }}>
                  {selectedRequest.description}
                </p>
              </div>

              {selectedRequest.additionalNotes && (
                <div className="mb-3">
                  <strong style={{ color: '#76b900' }}>Additional Notes:</strong>
                  <p style={{ color: '#b3b3b3', marginTop: '0.5rem' }}>
                    {selectedRequest.additionalNotes}
                  </p>
                </div>
              )}

              {selectedRequest.eventPoster && (
                <div className="mb-3">
                  <strong style={{ color: '#76b900' }}>Event Poster:</strong>
                  <div className="mt-2">
                    <Image
                      src={selectedRequest.eventPoster}
                      alt="Event Poster"
                      width={400}
                      height={300}
                      style={{ objectFit: 'contain', border: '2px solid #76b900' }}
                    />
                  </div>
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#76b900', fontWeight: 'bold' }}>
                  Admin Notes
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  style={{
                    backgroundColor: '#0d0d0d',
                    border: '1px solid #76b900',
                    color: '#ffffff',
                  }}
                  placeholder="Add internal notes about this request..."
                />
              </Form.Group>

              <div className="d-flex flex-wrap gap-2">
                <Button
                  onClick={() => handleUpdateStatus('PENDING')}
                  disabled={updating || selectedRequest.status === 'PENDING'}
                  style={{
                    backgroundColor: '#f39c12',
                    border: 'none',
                    color: '#ffffff',
                  }}
                >
                  Mark as Pending
                </Button>
                <Button
                  onClick={() => handleUpdateStatus('APPROVED')}
                  disabled={updating || selectedRequest.status === 'APPROVED'}
                  style={{
                    backgroundColor: '#27ae60',
                    border: 'none',
                    color: '#ffffff',
                  }}
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleUpdateStatus('LIVE')}
                  disabled={updating || selectedRequest.status === 'LIVE'}
                  style={{
                    background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                    border: 'none',
                    color: '#0d0d0d',
                  }}
                >
                  Mark as Live
                </Button>
                <Button
                  onClick={() => handleUpdateStatus('REJECTED')}
                  disabled={updating || selectedRequest.status === 'REJECTED'}
                  style={{
                    backgroundColor: '#e74c3c',
                    border: 'none',
                    color: '#ffffff',
                  }}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleUpdateStatus('CLOSED')}
                  disabled={updating || selectedRequest.status === 'CLOSED'}
                  style={{
                    backgroundColor: '#95a5a6',
                    border: 'none',
                    color: '#ffffff',
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#1a1a1a', borderTop: '2px solid #76b900' }}>
          <Button
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: '#2d2d2d',
              border: '1px solid #76b900',
              color: '#76b900',
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
