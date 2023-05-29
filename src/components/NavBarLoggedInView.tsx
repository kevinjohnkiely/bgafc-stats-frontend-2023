import React from 'react';
import { User } from '../models/user';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccess: () => void;
  onShowAddPlayerModal: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccess,
  onShowAddPlayerModal
}: NavBarLoggedInViewProps) => {
  const logoutUser = async () => {
    await fetch('/api/v1/users/logout', { method: 'POST' });
    onLogoutSuccess();
    // PUT LOGOUT FAILURE CODE HERE //////////////////////
  };

  return (
    <>
      <Navbar.Text className='me-2'>Logged in as: {user?.username}</Navbar.Text>
      <Button onClick={logoutUser} variant='danger'>
        Logout
      </Button>
      <Button onClick={onShowAddPlayerModal}>Add Player</Button>
    </>
  );
};

export default NavBarLoggedInView;
