import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Loader from './common/Loader';
import Notification from './common/Notification';

interface SeasonInput {
  season: string;
  team: string;
  division: string;
  lge_apps: string;
  lge_goals: string;
}

const AddSeason = () => {
  const { playerId, slug } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SeasonInput>({
    defaultValues: {
      //   firstName: playerToEdit?.firstName || '',
      //   lastName: playerToEdit?.lastName || '',
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
      navigate(`/players/${slug}`)
    }
  };

  const onSubmitSeason = async (input: SeasonInput) => {
    await createSeason(input);
  };

  return (
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
      <Button type='submit' form='addEditPlayerForm' disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};

export default AddSeason;
