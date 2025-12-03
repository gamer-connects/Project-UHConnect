'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import {
  Card, Col, Button, Form, Row,
} from 'react-bootstrap';
import { changePassword } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type ChangePasswordForm = {
  oldpassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email || '';

  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Old password is required'),
    password: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Please confirm password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      await changePassword({ email, ...data });

      await swal('Success!', 'Your password has been changed.', 'success', {
        timer: 2000,
      });

      reset();
    } catch {
      swal('Error', 'Failed to change password.', 'error');
    }
  };

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <main
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#111',
          border: '2px solid #76b900', // NEON BORDER
          borderRadius: '18px',
          color: '#ffffff',
          boxShadow: '0 0 25px rgba(118,185,0,0.35)', // NEON GLOW
        }}
      >
        <Card.Body>
          <h2
            className="fw-bold text-center mb-1"
            style={{
              color: '#76b900',
              textShadow: '0 0 10px rgba(118,185,0,0.6)',
            }}
          >
            Change Password
          </h2>

          <p className="text-center mb-4" style={{ color: '#cccccc' }}>
            Secure your UH Connect account
          </p>

          <Form onSubmit={handleSubmit(onSubmit)}>

            {/* Old Password */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ffffff' }}>Old Password</Form.Label>
              <Form.Control
                type="password"
                {...register('oldpassword')}
                className={errors.oldpassword ? 'is-invalid' : ''}
                style={{ background: '#1a1a1a', color: '#ffffff' }}
              />
              <div className="invalid-feedback">{errors.oldpassword?.message}</div>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ffffff' }}>New Password</Form.Label>
              <Form.Control
                type="password"
                {...register('password')}
                className={errors.password ? 'is-invalid' : ''}
                style={{ background: '#1a1a1a', color: '#ffffff' }}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4">
              <Form.Label style={{ color: '#ffffff' }}>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'is-invalid' : ''}
                style={{ background: '#1a1a1a', color: '#ffffff' }}
              />
              <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
            </Form.Group>

            {/* Buttons */}
            <Row>
              <Col xs={6}>
                <Button className="w-100 fw-bold btn-primary" style={{ borderRadius: '10px' }}>
                  Change
                </Button>
              </Col>

              <Col xs={6}>
                <Button
                  type="button"
                  className="w-100 fw-bold"
                  variant="secondary"
                  onClick={() => reset()}
                  style={{ borderRadius: '10px' }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
};

export default ChangePassword;
