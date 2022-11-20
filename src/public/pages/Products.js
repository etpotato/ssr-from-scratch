import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, List, ListItemButton, ListItemText, Typography,
} from '@mui/material';

export default function Products({ products }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <Typography variant="h2" component="h1">Products</Typography>
      <Link to="/">
        <Button variant="contained">Go home</Button>
      </Link>
      <p>{ count }</p>
      <Button variant="contained" onClick={() => setCount((state) => state + 1)}>increment</Button>
      <Button variant="contained" onClick={() => setCount((state) => state - 1)}>decrement</Button>
      <List>
        { products?.map((product) => (
          <ListItemButton key={product.id}>
            <ListItemText>{product.title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
