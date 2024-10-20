import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

export const Footer = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        paddingTop: '2rem',
        paddingLeft: is700 ? '1rem' : '3rem',
        paddingRight: is700 ? '1rem' : '3rem',
        paddingBottom: '1rem',
        color: theme.palette.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6">AccessCart</Typography>
      <Typography variant="body2" color="GrayText">
        Accenture Innovation Challenge 2024
      </Typography>
    </Stack>
  );
};
