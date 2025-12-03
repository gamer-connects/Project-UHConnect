'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Button, Form, Row } from 'react-bootstrap';
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
  } = useForm<ChangePasswordForm>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      await changePassword({ email, ...data });

      await swal('Success!', 'Your password has been changed.', 'success', {
        timer: 2000,
      });

      reset();
    } catch (err) {
      swal('Error', 'Failed to change password.', 'error');
    }
  };

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #8a00ff, #0066ff)',
        padding: '20px',
      }}
    >
      <Card
        className="p-4 shadow-lg border-0"
        style={{
          maxWidth: '480px',
          width: '100%',
          borderRadius: '20px',
        }}
      >
        <Card.Body>
          <h2
            className="fw-bold text-center mb-1"
            style={{ color: '#00aaff' }}
          >
            Change Password
          </h2>

          <p className="text-muted text-center mb-4">
            Secure your UHConnect account
          </p>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Old Password */}
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                {...register('oldpassword')}
                className={errors.oldpassword ? 'is-invalid' : ''}
              />
              <div className="invalid-feedback">
                {errors.oldpassword?.message}
              </div>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                {...register('password')}
                className={errors.password ? 'is-invalid' : ''}
              />
              <div className="invalid-feedback">
                {errors.password?.message}
              </div>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'is-invalid' : ''}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </Form.Group>

            {/* Buttons */}
            <Row>
              <Col xs={6}>
                <Button
                  type="submit"
                  className="w-100 fw-bold"
                  style={{
                    background: 'linear-gradient(to right, #00aaff, #8a00ff)',
                    border: 'none',
                    borderRadius: '10px',
                  }}
                >
                  Change
                </Button>
              </Col>

              <Col xs={6}>
                <Button
                  type="button"
                  className="w-100 fw-bold"
                  style={{
                    borderRadius: '10px',
                  }}
                  variant="secondary"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChangePassword;
