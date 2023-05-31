import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Loader from './common/Loader';
import Notification from './common/Notification';
import { Season } from '../models/season';

interface AddEditSeasonProps {
  seasonToEdit?: Season | null;
}

interface SeasonInput {
  season: string;
  team: string;
  division: string;
  lge_apps: number;
  lge_goals: number;
}

const AddEditSeason = ({ seasonToEdit }: AddEditSeasonProps) => {
  const { playerId, slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SeasonInput>({
    defaultValues: {
      season: seasonToEdit?.season || '',
      team: seasonToEdit?.team || '',
      division: seasonToEdit?.division || '',
      lge_apps: seasonToEdit?.lge_apps || 0,
      lge_goals: seasonToEdit?.lge_goals || 0,
    },
  });

  const createSeason = async (season: SeasonInput) => {
    setLoading(true);

    const response = await fetch(`/api/v1/players/${playerId}/seasons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(season),
    });

    if (response.status === 500) {
      setError('Server Error! Please try again soon...');
      setLoading(false);
    }

    const seasonRes = await response.json();

    if (seasonRes.message) {
      setError(seasonRes.message);
      setLoading(false);
    } else {
      setLoading(false);
      navigate(`/players/${slug}`);
    }
  };

  const editSeason = async (input: SeasonInput, seasonId: string) => {
    setLoading(true);

    const response = await fetch(`/api/v1/seasons/${seasonId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (response.status === 500) {
      setError('Server Error! Please try again soon...');
      setLoading(false);
    }

    const seasonRes = await response.json();

    if (seasonRes.message) {
      setError(seasonRes.message);
      setLoading(false);
    } else {
      setLoading(false);
      navigate(`/players/${slug}`);
    }
    // return playerRes.data.player;
  };

  const onSubmitSeason = async (input: SeasonInput) => {
    if (seasonToEdit) {
      await editSeason(input, seasonToEdit._id);
    } else {
      await createSeason(input);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        {seasonToEdit ? 'Edit Season' : 'Add Season'}
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
        <Form id='addEditPlayerForm' onSubmit={handleSubmit(onSubmitSeason)}>
          <div>{error && <Notification message={error} />}</div>
          <div>{isSubmitting && <Loader />}</div>
          <Form.Group className='mb-3'>
            <Form.Label>Season</Form.Label>
            <Form.Control
              type='text'
              placeholder='Season Years'
              isInvalid={!!errors.season}
              {...register('season', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.season?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Team</Form.Label>
            <Form.Control
              type='text'
              placeholder='Team'
              isInvalid={!!errors.team}
              {...register('team', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.team?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Division</Form.Label>
            <Form.Control
              type='text'
              placeholder='Division'
              isInvalid={!!errors.division}
              {...register('division', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.division?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>League Appearances</Form.Label>
            <Form.Control
              type='text'
              placeholder='League Appearances'
              isInvalid={!!errors.lge_apps}
              {...register('lge_apps', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.lge_apps?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>League Goals</Form.Label>
            <Form.Control
              type='text'
              placeholder='League Goals'
              isInvalid={!!errors.lge_goals}
              {...register('lge_goals', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.lge_goals?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='success'
              type='submit'
              form='addEditPlayerForm'
              style={{ marginRight: '0.6rem' }}
              disabled={isSubmitting}
            >
              {seasonToEdit ? 'Update Season' : 'Add Season'}
            </Button>{' '}
            <Link to={`/players/${slug}`}>
              <Button variant='danger'>Go Back</Button>
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddEditSeason;
