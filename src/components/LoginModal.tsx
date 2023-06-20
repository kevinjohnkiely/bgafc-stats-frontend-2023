import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import Loader from './common/Loader';
import Notification from './common/Notification';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccess }: LoginModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmitLogin = async (creds: LoginCredentials) => {
    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    });

    if (response.status === 500) {
      setError('Server Error! Please try again soon...');
      setLoading(false);
    }

    const user = await response.json();

    if (user.message) {
      setError(user.message);
      setLoading(false);
    } else {
      setLoading(false);
      onLoginSuccess(user.data.user)
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <div>{error && <Notification message={error} />}</div>
      <div>{(isSubmitting || loading) && <Loader />}</div>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmitLogin)}>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Username'
              isInvalid={!!errors.username}
              {...register('username', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              isInvalid={!!errors.password}
              {...register('password', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type='submit' variant='success' disabled={isSubmitting}>
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
