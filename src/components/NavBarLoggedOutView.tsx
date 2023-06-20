import React from 'react';
import { Button } from 'react-bootstrap';

interface NavBarLoggedOutViewProps {
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({ onLoginClicked }: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onLoginClicked} variant='success'>Admin Login</Button>
    </>
  );
};

export default NavBarLoggedOutView;
