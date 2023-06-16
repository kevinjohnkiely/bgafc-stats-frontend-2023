import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { deslugify } from '../utils/deslugify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';

const AddImage = () => {
  const { playerSlug } = useParams();
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
  const [previewSource, setPreviewSource] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const fileNameStr = e.target.files[0].name;
    const fileNameStrSpliced = fileNameStr.split('.')[0];
    setFileName(fileNameStrSpliced);
    previewFile(file);
    console.log(e.target.files[0]);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleSubmitFile = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncImage: string) => {
    setLoading(true);
    // console.log(base64EncImage);
    const response = await fetch(`/api/v1/players/uploadphoto/${playerSlug}`, {
      method: 'POST',
      body: JSON.stringify({ data: base64EncImage, fileName: fileName }),
      headers: { 'Content-type': 'application/json' },
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

  return (
    <>
      {loading && <Loader />}
      {error && <Notification message={error} />}
      <h2 style={{ textAlign: 'center' }}>
        Add photo for player {deslugify(playerSlug)}
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
        <Form id='imageForm' onSubmit={handleSubmitFile}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='file'
                  name='image'
                  onChange={handleFileInputChange}
                  value={fileInputState}
                />
              </Form.Group>
            </Col>
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            {/* <Button
              variant='success'
              type='submit'
              style={{ marginRight: '0.6rem' }}
              //   disabled={isSubmitting}
            >
              
              Add Image
            </Button>{' '} */}
            <Link to={`/players/${playerSlug}`}>
              <Button variant='danger'>Go Back</Button>
            </Link>
          </div>
        </Form>
        {previewSource && (
          <>
            <img
              src={previewSource}
              alt='Your chosen pic'
              style={{ height: '150px' }}
            />
            <Button
              form='imageForm'
              variant='success'
              type='submit'
              style={{ marginLeft: '0.6rem' }}
            >
              Upload Image
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default AddImage;
