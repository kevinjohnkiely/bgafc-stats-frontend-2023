import React, { useState } from 'react';

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (creds: LoginCredentials) => {
    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    });

    if (response.status === 500) {
      setError('Server Error! Please try again soon...');
      setLoading(false);
    }

    const user = await response.json();
    console.log(user)
    // NEED TO MAYBE RETURN USER!!!!!

    if (user.message) {
      setError(user.message);
      setLoading(false);
    } else {
      setLoading(false);
      console.log('success');
    }
  };

  return <div>LoginModal</div>;
};

export default LoginModal;
