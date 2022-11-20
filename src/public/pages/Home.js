import React, { useRef, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { Link } from 'react-router-dom';

export default function App() {
  const icon = useRef();

  useEffect(() => {
    let unmounted = false;

    function animate(element, index = 1) {
      if (unmounted) return;
      // eslint-disable-next-line no-param-reassign
      element.style = `
        transform: rotate(${index % 360}deg); color: hsl(${index % 360}, 100%, 50%)
      `;
      requestAnimationFrame(
        () => requestAnimationFrame(
          () => animate(element, index + 1),
        ),
      );
    }

    if (icon.current) {
      animate(icon.current);
    }

    return () => { unmounted = true; };
  }, []);

  return (
    <>
      <Typography variant="h2" component="h1">
        Homepage
        {' '}
        <BathtubIcon fontSize="1.5em" ref={icon} />
      </Typography>
      <Link to="products">
        <Button variant="contained">Products</Button>
      </Link>
      <Link to="about">
        <Button variant="contained">About</Button>
      </Link>
    </>
  );
}
