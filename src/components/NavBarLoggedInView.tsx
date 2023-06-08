import React, { useState } from 'react';
import { User } from '../models/user';
import { Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccess: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccess,
}: NavBarLoggedInViewProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const logoutUser = async () => {
    const response = await fetch('/api/v1/users/logout', { method: 'POST' });

    if (response.status === 500) {
      setError('Failed to log out! Please try again soon...');
    } else {
      onLogoutSuccess();
      navigate('/');
    }
  };

  return (
    <>
      <Navbar.Text className='me-2'>Logged in as: {user?.username}</Navbar.Text>
      <Button onClick={logoutUser} variant='danger'>
        Logout
      </Button>{" "}
      { error && <div style={{ color: 'white'}}>{error}</div> }
    </>
  );
};

export default NavBarLoggedInView;
