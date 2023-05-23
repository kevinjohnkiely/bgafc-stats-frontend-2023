import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Player } from '../models/player';
import { useForm } from 'react-hook-form';
import Notification from '../components/common/Notification';
import Loader from './common/Loader';

interface AddPlayerModalProps {
  onDismiss: () => void;
  onPlayerSaved: (player: Player) => void;
}

interface PlayerInput {
  firstName: string;
  lastName: string;
}

const AddPlayerModal = ({ onDismiss, onPlayerSaved }: AddPlayerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlayerInput>();

  const createPlayer = async (player: PlayerInput) => {
    setLoading(true);

    const response = await fetch('/api/v1/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });
    // return response.json();
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
    }
    return playerRes.data.player;
  };

  const onSubmitNewPlayer = async (input: PlayerInput) => {
    const playerResponse = await createPlayer(input);
    console.log(playerResponse);
    onPlayerSaved(playerResponse);
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Player</Modal.Title>
      </Modal.Header>
      <div>{error && <Notification message={error} />}</div>
      <div>{isSubmitting && <Loader />}</div>
      <Modal.Body>
        <Form id='addPlayerForm' onSubmit={handleSubmit(onSubmitNewPlayer)}>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='addPlayerForm' disabled={isSubmitting}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPlayerModal;
