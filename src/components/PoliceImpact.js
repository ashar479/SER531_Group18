// src/components/Trends.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

// Import Chart.js components that need to be registered
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PoliceImpact = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Crime Incidents',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Crime Incidents',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Crimes',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Evaluating the Impact of Police Presence on Crime Reduction
      </Typography>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default PoliceImpact;
