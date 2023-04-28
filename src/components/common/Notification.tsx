import React from 'react';
import { Alert } from 'react-bootstrap';

interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  return <Alert variant='danger'>{ message }</Alert>;
};

export default Notification;
