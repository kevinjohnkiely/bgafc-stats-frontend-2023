import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import styles from '../styles/Button.module.css';
import { User } from '../models/user';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    onLoginSuccessful: (user: User) => void,
}

const Login = ({ onLoginSuccessful }: LoginProps) => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const userInput = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    if (form.checkValidity() === true) {
      //   authContext.login(userInput);
      console.log(userInput);
      loginHandler(userInput);
    }
  };

  interface LoginCredentials {
    username: string | undefined;
    password: string | undefined;
  }

  const loginHandler = async (loginCredentials: LoginCredentials) => {
    setLoading(true);

    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginCredentials),
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
      console.log('sucesss')
      console.log(user)
      onLoginSuccessful(user)
    }
  };

  return (
    <Container fluid style={{ padding: '0 5rem 0 5rem' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? <Notification message={error} /> : null}
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h3>
          <Card
            style={{
              width: '50%',
              margin: 'auto',
              padding: '1rem',
              backgroundColor: '#ffcb00',
            }}
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  ref={usernameRef}
                  placeholder='Enter username'
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  Please enter a username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  ref={passwordRef}
                  placeholder='Password'
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  Please enter your password.
                </Form.Control.Feedback>
              </Form.Group>
              <div className='text-center'>
                <Button className={styles.customButton} type='submit'>
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Login;
