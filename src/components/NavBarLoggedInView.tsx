import React from 'react';
import { User } from '../models/user';
import { Button, Navbar } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccess: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccess
}: NavBarLoggedInViewProps) => {
  const navigate = useNavigate()

  const logoutUser = async () => {
    await fetch('/api/v1/users/logout', { method: 'POST' });
    onLogoutSuccess();
    navigate('/')
    // PUT LOGOUT FAILURE CODE HERE //////////////////////
  };

  return (
    <>
      <Navbar.Text className='me-2'>Logged in as: {user?.username}</Navbar.Text>
      <Button onClick={logoutUser} variant='danger'>
        Logout
      </Button>
    </>
  );
};

export default NavBarLoggedInView;
