import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, List, ListItem, ListItemText, Typography, CircularProgress,
} from '@mui/material';

export default function Products({ data }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(data);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    (async () => {
      if (!data?.length) {
        setLoading(true);
        try {
          const res = await fetch('/api/products', { signal: controller.signal });
          const apiData = await res.json();
          if (mounted) {
            setProducts(apiData.products);
          }
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [data]);

  const content = loading || !products?.length
    ? <CircularProgress style={{ display: 'block' }} />
    : (
      <List>
        { products.map((item) => (
          <ListItem key={item.id}>
            <Link to={`/product/${item.id}`} state={item}>
              <ListItemText>
                {item.id}
                {item.title}
              </ListItemText>
            </Link>
          </ListItem>
        ))}
      </List>
    );

  return (
    <>
      <Typography variant="h2" component="h1">Products</Typography>
      <Link to="/">
        <Button variant="contained">Go home</Button>
      </Link>
      <p>{ count }</p>
      <Button variant="contained" onClick={() => setCount((state) => state + 1)}>increment</Button>
      <Button variant="contained" onClick={() => setCount((state) => state - 1)}>decrement</Button>
      {content}
    </>
  );
}
