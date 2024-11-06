// src/pages/Dashboard.tsx
import React from 'react';
import { Grid, Box, Typography } from '@mui/material'; // Use the standard Grid
import DashboardLayout from '../../layouts/crm/DashboardLayout';
import ProductDashboard from '../../components/Dashboard/Product/ProductDashboard';
import BrandCountChart from '../../components/Dashboard/Product/BrandCountChart';
import DashboardPage from '../../components/Dashboard/DashboardPage';

const Dashboard: React.FC = () => {
  const branchShortId = sessionStorage.getItem('branchShortId');

  return (
    <DashboardLayout>
      <DashboardPage />
      <Grid container spacing={4} style={{padding : 2 , marginTop : 5}}>
        {/* Profit Distribution Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              p: 3,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
              height: '100%',
              boxShadow: 2,
              width : 520,marginLeft : 5
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Profit Distribution
            </Typography>
            <ProductDashboard />
          </Box>
        </Grid>

        {/* Product Count by Brand Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              p: 3,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
              height: '100%',
              boxShadow: 2,
              width : 520
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Product Count by Brand
            </Typography>
            {branchShortId ? (
              <BrandCountChart branchShortId={branchShortId} />
            ) : (
              <p>Please select a branch.</p>
            )}
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
