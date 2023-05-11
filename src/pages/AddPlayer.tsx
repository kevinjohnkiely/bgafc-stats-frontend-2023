import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import { useTypedSelector } from '../redux/redux-hooks/useTypedSelector';
import styles from '../styles/Button.module.css';
import { useDispatch } from 'react-redux';
import { playerActionCreators } from '../redux';
import { useNavigate } from 'react-router-dom';

const AddPlayer = () => {
  const { user, error, loading } = useTypedSelector((state) => state.user);
  const { player } = useTypedSelector((state) => state.player);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (player) {
    //     alert('afsdsa')
    //   navigate('/');
    // }
    console.log('user in use effect in addplayer component is ' + user);
  }, [navigate, user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log('form invalid')
    }
    
    setValidated(true);
    
    const userInput = { firstName: username, lastName: password };
    dispatch(playerActionCreators.createPlayer(userInput) as any);
    navigate('/')
  };

  return (
    <Container fluid style={{ padding: '0 5rem 0 5rem' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? <Notification message={error} /> : null}
          <h3>User is : {user}</h3>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Add a Player</h3>
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
                <Form.Label>First Name:</Form.Label>
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
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type='text'
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

export default AddPlayer;
