import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <Typography variant="h2" component="h1">About page</Typography>
      <Link to="/">
        <Button variant="contained">Go home</Button>
      </Link>
    </>
  );
}
