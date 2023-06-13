import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Loader from './common/Loader';
import Notification from './common/Notification';
import { Season } from '../models/season';
import TextInputField from './form/TextInputField';
import { deslugify } from '../utils/deslugify';

interface AddEditSeasonProps {
  seasonToEdit?: Season | null;
  // onSeasonSaved: (season: Season) => void;
}

interface SeasonInput {
  season: string;
  division: string;
  team?: string;
  lge_apps: number;
  lge_goals: number;
  fai_apps: number;
  fai_goals: number;
  mjc_apps: number;
  mjc_goals: number;
  msc_apps: number;
  msc_goals: number;
  desc_apps: number;
  desc_goals: number;
  lgec_apps: number;
  lgec_goals: number;
  reidyc_apps: number;
  reidyc_goals: number;
  hoganc_apps: number;
  hoganc_goals: number;
}

const AddEditSeason = ({ seasonToEdit }: AddEditSeasonProps) => {
  const { playerId, slug, team } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SeasonInput>({
    defaultValues: {
      season: seasonToEdit?.season || '',
      division: seasonToEdit?.division || '',
      lge_apps: seasonToEdit?.lge_apps || 0,
      lge_goals: seasonToEdit?.lge_goals || 0,
      fai_apps: seasonToEdit?.fai_apps || 0,
      fai_goals: seasonToEdit?.fai_goals || 0,
      mjc_apps: seasonToEdit?.mjc_apps || 0,
      mjc_goals: seasonToEdit?.mjc_goals || 0,
      msc_apps: seasonToEdit?.msc_apps || 0,
      msc_goals: seasonToEdit?.msc_goals || 0,
      desc_apps: seasonToEdit?.desc_apps || 0,
      desc_goals: seasonToEdit?.desc_goals || 0,
      lgec_apps: seasonToEdit?.lgec_apps || 0,
      lgec_goals: seasonToEdit?.lgec_goals || 0,
      reidyc_apps: seasonToEdit?.reidyc_apps || 0,
      reidyc_goals: seasonToEdit?.reidyc_goals || 0,
      hoganc_apps: seasonToEdit?.hoganc_apps || 0,
      hoganc_goals: seasonToEdit?.hoganc_goals || 0,
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
    return seasonRes.data.season;
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
    return seasonRes.data.season;
  };

  const onSubmitSeason = async (input: SeasonInput) => {
    let seasonResponse: Season;
    if (seasonToEdit) {
      input.team = team;
      seasonResponse = await editSeason(input, seasonToEdit._id);
    } else {
      input.team = team;
      seasonResponse = await createSeason(input);
    }
    console.log(seasonResponse);
    // onSeasonSaved(seasonResponse);
    navigate(0);
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        {seasonToEdit
          ? `Edit Season (${team} Team): ${deslugify(slug)}`
          : `Add Season (${team} Team): ${deslugify(slug)}`}
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
        <Form onSubmit={handleSubmit(onSubmitSeason)}>
          <input type='hidden' name='team' value={team} />
          <Row>
            <Col md={2} sm={6}>
              <TextInputField
                name='season'
                autoFocus
                label='Season Years'
                type='text'
                placeholder='e.g: 2022/03'
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.season}
              />
            </Col>
            <Col md={2} sm={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Division</Form.Label>
                <Form.Select
                  isInvalid={!!errors.division}
                  defaultValue='Prem'
                  {...register('division', { required: 'Required' })}
                >
                  <option value='Prem'>Prem</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='2a'>2a</option>
                  <option value='2b'>2b</option>
                  <option value='3'>3</option>
                  <option value='3a'>3a</option>
                  <option value='3b'>3b</option>
                  <option value='4'>4</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={2} sm={6}>
              <TextInputField
                name='lge_apps'
                label='League Apps'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.lge_apps}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                disabled={!watch('lge_apps')}
                name='lge_goals'
                label='League Goals'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.lge_goals}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                name='fai_apps'
                label='FAI Cup Apps'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.fai_apps}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                disabled={!watch('fai_apps')}
                name='fai_goals'
                label='FAI Cup Goals'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.fai_goals}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                name='mjc_apps'
                label='MJC Apps'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.mjc_apps}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                disabled={!watch('mjc_apps')}
                name='mjc_goals'
                label='MJC Goals'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.mjc_goals}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2} sm={6}>
              <TextInputField
                name='msc_apps'
                label='MSC Apps'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.msc_apps}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                disabled={!watch('msc_apps')}
                name='msc_goals'
                label='MSC Goals'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.msc_goals}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                name='desc_apps'
                label='Des. Cup Apps'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.desc_apps}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                disabled={!watch('desc_apps')}
                name='desc_goals'
                label='Des. Cup Goals'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.desc_goals}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                name='lgec_apps'
                label='Lge. Cup Apps'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.lgec_apps}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                disabled={!watch('lgec_apps')}
                name='lgec_goals'
                label='Lge. Cup Goals'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.lgec_goals}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2} sm={6}>
              <TextInputField
                name='reidyc_apps'
                label='Reidy Cup Apps'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.reidyc_apps}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                disabled={!watch('reidyc_apps')}
                name='reidyc_goals'
                label='Reidy Cup Goals'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.reidyc_goals}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                name='hoganc_apps'
                label='Hogan Cup Apps'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.hoganc_apps}
              />
            </Col>
            <Col md={2} sm={6}>
              <TextInputField
                disabled={!watch('hoganc_apps')}
                name='hoganc_goals'
                label='Hogan Cup Goals'
                type='number'
                min={0}
                register={register}
                registerOptions={{ required: 'Required' }}
                error={errors.hoganc_goals}
              />
            </Col>
          </Row>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='success'
              type='submit'
              style={{ marginRight: '0.6rem' }}
              disabled={isSubmitting}
            >
              {seasonToEdit ? `Update Season` : `Add Season`}
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
