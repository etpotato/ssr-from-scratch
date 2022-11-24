import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Typography variant="h1" component="h1">404</Typography>
      <Typography variant="h2" component="h2">Not found</Typography>
      <Link to="/">
        <Button variant="contained">Go home</Button>
      </Link>
    </>
  );
}
