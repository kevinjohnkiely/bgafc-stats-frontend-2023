import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import styles from '../styles/Button.module.css';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
      console.log(userInput)
    }
  };
  return (
    <Container fluid style={{ padding: '0 5rem 0 5rem' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Notification message={error} />
          ) : null}
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
