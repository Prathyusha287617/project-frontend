import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import DashboardLayout from '../../layouts/crm/DashboardLayout';
import ProductDashboard from '../../components/Dashboard/Product/ProductDashboard';
import BrandCountChart from '../../components/Dashboard/Product/BrandCountChart';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import OrderStatsChart from '../../components/Dashboard/Orders/OrdersStatsChart';
import OrderStatusPieChart from '../../components/Dashboard/Orders/OrderStatusPieChart'; // Import the OrderStatusPieChart component


const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [branchShortId, setBranchShortId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve role and branchShortId from sessionStorage
    const storedRole = sessionStorage.getItem('role');
    const storedBranchShortId = sessionStorage.getItem('branchShortId');
    setRole(storedRole);
    setBranchShortId(storedBranchShortId);
  }, []);

  return (
    <DashboardLayout>
      <DashboardPage />
      <Grid container spacing={4} sx={{ padding: 2, marginTop: 5 }}>
        {/* Only show this to branch retailers */}
        {role === 'branch_retailer' && (
          <>
            {/* Profit Distribution Card */}
            <Grid item xs={12} sm={6} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  boxShadow: 2,
                  width: '100%',
                  maxWidth: 520,
                  margin: '0 auto',
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
                  boxShadow: 2,
                  width: '100%',
                  maxWidth: 520,
                  margin: '0 auto',
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Product Count by Brand
                </Typography>
                {branchShortId ? (
                  <BrandCountChart branchShortId={branchShortId} />
                ) : (
                  <Typography color="textSecondary">Please select a branch.</Typography>
                )}
              </Box>
            </Grid>

            {/* Order Status Pie Chart */}
            <Grid item xs={12} sm={6} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  boxShadow: 2,
                  width: '100%',
                  maxWidth: 520,
                  margin: '0 auto',
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Order Status
                </Typography>
                {branchShortId ? (
                  <OrderStatusPieChart />
                ) : (
                  <Typography color="textSecondary">Branch Short ID not available.</Typography>
                )}
              </Box>
            </Grid>
          </>
        )}
      

        {/* Always show this to business retailers */}
        {role === 'business_retailer' && (
          <Grid item xs={12} sm={12} md={12}>
            <Box
              sx={{
                p: 3,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: 2,
                width: '100%',
                maxWidth: 520,
                margin: '0 auto',
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Order Stats
              </Typography>
              <OrderStatsChart />
            </Box>
          </Grid>
        )}
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
