import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import styles from '../styles/Button.module.css';
import { useState } from 'react';

const Login = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h3>
      <Card style={{ width: '50%', margin: 'auto', padding: '1rem' }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' placeholder='Enter username' required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please enter a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' placeholder='Password' required />
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
  );
};

export default Login;
