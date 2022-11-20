import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, List, ListItemButton, ListItemText, Typography,
} from '@mui/material';

export default function Products({ items }) {
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
        { items?.map((item) => (
          <ListItemButton key={item.id}>
            <ListItemText>{item.title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
