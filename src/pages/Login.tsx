import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import { loginActionCreators } from '../redux';
import { useTypedSelector } from '../redux/redux-hooks/useTypedSelector';
import styles from '../styles/Button.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useTypedSelector((state) => state.loginUser);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user !== '') {
      navigate('/');
    }
    console.log('user in use effect in login component is ' + user);
  }, [navigate, user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const userInput = { username: username, password: password };
    dispatch(loginActionCreators.loginUser(userInput) as any);
  };

  return (
    <Container fluid style={{ padding: '0 5rem 0 5rem' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? <Notification message={error} /> : null}
          <h3>User is : {user}</h3>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h3>
          <Card style={{ width: '50%', margin: 'auto', padding: '1rem' }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
