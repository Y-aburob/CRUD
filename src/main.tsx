import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { NavMenu } from './components';
import AppRoutes from './routes/AppRoutes';
import { Box, Typography } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Box display={'flex'} padding={3} bgcolor={'#f5f4f4'} justifyContent={'space-between'}>
        <Typography variant="h5">CRUD System</Typography>
        <NavMenu />
      </Box>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
