import React, { useState } from 'react';
import { Player } from '../models/player';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import TextInputField from '../components/form/TextInputField';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import { apiUrl } from '../utils/apiUrl';

interface AddEditPlayerProps {
  playerToEdit?: Player | null;
  onPlayerSaved: (player: Player) => void;
}

interface PlayerInput {
  firstName: string;
  lastName: string;
  slug: string;
  dateOfBirth: string;
  position: string;
  debut: string;
  firstGoal: string;
  honours: string;
}

const AddEditPlayer = ({ playerToEdit, onPlayerSaved }: AddEditPlayerProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlayerInput>({
    defaultValues: {
      firstName: playerToEdit?.firstName || '',
      lastName: playerToEdit?.lastName || '',
      slug: playerToEdit?.slug || '',
      dateOfBirth: playerToEdit?.dateOfBirth || '',
      position: playerToEdit?.position || '',
      debut: playerToEdit?.debut || '',
      firstGoal: playerToEdit?.firstGoal || '',
      honours: playerToEdit?.honours || '',
    },
  });

  const createPlayer = async (player: PlayerInput) => {
    setLoading(true);

    const response = await fetch(`${apiUrl}players`, {
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

    const response = await fetch(`${apiUrl}players/${slug}`, {
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
      reset();
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
      console.log(playerResponse);
    } else {
      playerResponse = await createPlayer(input);
    }
    console.log(playerResponse);
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
      {loading && <Loader />}
      {error && <Notification message={error} />}
      <Container style={{ marginTop: '2rem' }}>
        <Form onSubmit={handleSubmit(onSubmitPlayer)}>
          <Row>
            <Col md={4} sm={12}>
              <TextInputField
                name='firstName'
                label='First Name'
                type='text'
                placeholder='First Name'
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.firstName}
              />
            </Col>
            <Col md={4} sm={12}>
              <TextInputField
                name='lastName'
                label='Last Name'
                type='text'
                placeholder='Last Name'
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.lastName}
              />
            </Col>
            <Col md={4} sm={12}>
              <TextInputField
                name='slug'
                label='Player Slug (what is this?)'
                tooltip
                type='text'
                placeholder='player-slug'
                register={register}
                disabled={!playerToEdit}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <TextInputField
                name='dateOfBirth'
                label='Date of Birth'
                type='text'
                placeholder='Date of Birth'
                register={register}
                // registerOptions={{ required: 'Required' }}
                // error={errors.dateOfBirth}
              />
            </Col>
            <Col md={6} sm={12}>
              <TextInputField
                name='position'
                label='Position'
                type='text'
                placeholder='Position'
                maxLength={20}
                register={register}
                // registerOptions={{ required: 'Required' }}
                error={errors.position}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <TextInputField
                name='debut'
                label='Debut'
                type='text'
                placeholder='Debut'
                register={register}
                // registerOptions={{ required: 'Required' }}
                // error={errors.debut}
              />
            </Col>
            <Col md={6} sm={12}>
              <TextInputField
                name='firstGoal'
                label='First Goal'
                type='text'
                placeholder='First Goal'
                register={register}
                // registerOptions={{ required: 'Required' }}
                // error={errors.firstGoal}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInputField
                name='honours'
                label='Honours'
                as='textarea'
                rows={5}
                placeholder='Honours'
                register={register}
                // registerOptions={{ required: 'Required' }}
                // error={errors.firstGoal}
              />
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
