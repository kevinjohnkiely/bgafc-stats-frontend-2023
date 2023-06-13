import { Alert } from 'react-bootstrap';

interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  return <Alert variant='danger' dismissible>{ message }</Alert>;
};

export default Notification;
