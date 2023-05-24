import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Player } from '../models/player';
import { useForm } from 'react-hook-form';
import Notification from './common/Notification';
import Loader from './common/Loader';

interface AddEditPlayerModalProps {
  playerToEdit?: Player;
  onDismiss: () => void;
  onPlayerSaved: (player: Player) => void;
}

interface PlayerInput {
  firstName: string;
  lastName: string;
}

const AddEditPlayerModal = ({
  playerToEdit,
  onDismiss,
  onPlayerSaved,
}: AddEditPlayerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    }
    return playerRes.data.player;
  };

  const editPlayer = async (slug: string, player: PlayerInput) => {
    setLoading(true);

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
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{playerToEdit ? "Edit Player" : "Add Player"}</Modal.Title>
      </Modal.Header>
      <div>{error && <Notification message={error} />}</div>
      <div>{isSubmitting && <Loader />}</div>
      <Modal.Body>
        <Form id='addEditPlayerForm' onSubmit={handleSubmit(onSubmitPlayer)}>
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
        <Button type='submit' form='addEditPlayerForm' disabled={isSubmitting}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditPlayerModal;
