import React from 'react';
import {
  Link, useLocation, useParams,
} from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import NotFound from './NotFound';

export default function Product({ data }) {
  const { id } = useParams();
  const renderData = data?.[id] ?? useLocation().state;

  if (!renderData) {
    return <NotFound />;
  }

  return (
    <>
      <Typography variant="h2" component="h1">{renderData.title}</Typography>
      <Typography variant="body1" component="p">{renderData.description}</Typography>
      <Link to="/products">
        <Button variant="contained">Products</Button>
      </Link>
      <Link to="/">
        <Button variant="contained">Home</Button>
      </Link>
    </>
  );
}
