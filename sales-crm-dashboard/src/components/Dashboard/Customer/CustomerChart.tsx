// CustomerChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dummy data for customers per branch
const data = [
  { branchShortId: 'Branch001', customerCount: 45 },
  { branchShortId: 'Branch002', customerCount: 30 },
  { branchShortId: 'Branch003', customerCount: 25 },
  { branchShortId: 'Branch004', customerCount: 60 },
  { branchShortId: 'Branch005', customerCount: 15 },
];

const CustomerChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="branchShortId" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="customerCount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomerChart;
