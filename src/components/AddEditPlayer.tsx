import React, { useState } from 'react';
import { Player } from '../models/player';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface AddEditPlayerProps {
  playerToEdit?: Player | null;
  onPlayerSaved: (player: Player) => void;
}

interface PlayerInput {
  firstName: string;
  lastName: string;
}

const AddEditPlayer = ({ playerToEdit, onPlayerSaved }: AddEditPlayerProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlayerInput>({
    defaultValues: {
      firstName: playerToEdit?.firstName || '',
      lastName: playerToEdit?.lastName || '',
    },
  });

  const createPlayer = async (player: PlayerInput) => {
    setLoading(true);

    const response = await fetch('/api/v1/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });

    if (response.status === 500) {
      setError('Server Error! Please try again soon...');
      setLoading(false);
    }

    const playerRes = await response.json();

    if (playerRes.message) {
      setError(playerRes.message);
      setLoading(false);
    } else {
      setLoading(false);
      navigate('/');
    }
    return playerRes.data.player;
  };

  const editPlayer = async (slug: string, player: PlayerInput) => {
    setLoading(true);
    console.log('Edit palyer function');

    const response = await fetch(`/api/v1/players/${slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });

    if (response.status === 500) {
      setError('Server Error! Please try again soon...');
      setLoading(false);
    }

    const playerRes = await response.json();

    if (playerRes.message) {
      setError(playerRes.message);
      setLoading(false);
    } else {
      setLoading(false);
      navigate('/');
    }
    return playerRes.data.player;
  };

  const onSubmitPlayer = async (input: PlayerInput) => {
    let playerResponse: Player;
    if (playerToEdit) {
      playerResponse = await editPlayer(playerToEdit.slug, input);
    } else {
      playerResponse = await createPlayer(input);
    }
    onPlayerSaved(playerResponse);
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        {playerToEdit
          ? `Update Player: ${playerToEdit.firstName} ${playerToEdit.lastName}`
          : 'Add Player'}
      </h2>
      <hr
        style={{
          width: '20%',
          margin: 'auto',
          marginTop: '2rem',
          border: 'solid 3px #ffcb00',
        }}
      />
      <Container style={{ marginTop: '2rem' }}>
        <Form onSubmit={handleSubmit(onSubmitPlayer)}>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='First Name'
                  isInvalid={!!errors.firstName}
                  {...register('firstName', { required: 'Required' })}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Last Name'
                  isInvalid={!!errors.lastName}
                  {...register('lastName', { required: 'Required' })}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: '0.6rem' }}
              variant='success'
              type='submit'
              disabled={isSubmitting}
            >
              {playerToEdit ? 'Update Player' : 'Add Player'}
            </Button>{' '}
            <Link to={'/'}>
              <Button variant='danger'>Go Back</Button>
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddEditPlayer;
