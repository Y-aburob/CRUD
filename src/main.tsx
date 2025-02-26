import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { NavMenu } from './components';
import AppRoutes from './routes/AppRoutes';
import { Box, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Box paddingBottom={'40px'}>
        <BrowserRouter>
          <Box
            display={'flex'}
            padding={3}
            bgcolor={'#fafafa'}
            position={'sticky'}
            top={0}
            zIndex={10}
            justifyContent={'space-between'}
          >
            <Typography variant="h4" color="primary">
              CRUD System
            </Typography>
            <NavMenu />
          </Box>
          <AppRoutes />
        </BrowserRouter>
      </Box>
    </QueryClientProvider>
  </StrictMode>
);
