import React, { useState } from 'react';
import {
  Button, List, ListItemButton, ListItemText, Typography,
} from '@mui/material';

export default function App({ products }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <Typography variant="h2" component="h1">React ssr test</Typography>
      <p>{ count }</p>
      <Button variant="contained" onClick={() => setCount((state) => state + 1)}>increment</Button>
      <Button variant="contained" onClick={() => setCount((state) => state - 1)}>decrement</Button>
      <List>
        { products.map((product) => (
          <ListItemButton key={product.id}>
            <ListItemText>{product.title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
