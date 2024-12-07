// src/components/Home.js
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Crime Data Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Contextual Analysis of Crime Hotspots
            </Typography>
            <Typography>
              Crime hotspots represent areas with higher incidents of crime,
              often highlighting underlying socio-economic or en- vironmental
              issues. By utilizing detailed location information, such as Block,
              Community Area, Beat, District, and Ward, alongside data on crime
              type and location descriptions, the project aims to precisely
              identify high-risk areas. This hotspot analysis supports law
              enforcement in deploying resources effectively and implementing
              preventive measures in spe- cific environments—like streets,
              apartments, or commercial areas—where specific crimes, such as
              theft or assault, occur frequently.
            </Typography>
            <Link to="/crime_hotspots">
              <button style={{ padding: '10px', marginTop: '10px' }}>
                View Map
              </button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Temporal Analysis of Crime Trends
            </Typography>
            <Typography>
              Temporal data reveals crime patterns over time, providing insights
              into both short-term fluctuations and long-term trends. Fields
              like Date and Year enable the examination of trends at hourly,
              daily, and yearly intervals. This temporal analysis assists law
              enforcement agencies in anticipating periods of heightened
              criminal activity, optimizing resource deployment during peak
              times, and developing predictive policing strate- gies. The
              “Updated On” field further supports an understand- ing of data
              currency, especially useful when dealing with real-time or
              frequently updated datasets to ensure ongoing relevance in
              analyses.
            </Typography>
            <Link to="/temporal_analysis">
              <button style={{ padding: '10px', marginTop: '10px' }}>
                View Trends
              </button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Yearly Analysis of Arrests by Crime Type
            </Typography>
            <Typography>
              This use case focuses on the number of arrests made for each type
              of crime in a given year. Using arrest data and information on the
              type of crime, the further breaks down the arrests by categories
              such as theft, robbery. By doing so, this type of analysis helps
              to portray trends in law enforcement activity and points out which
              crime types received most attention during the year. Such insights
              enable stakeholders to evaluate law enforcement priorities, assess
              resource allocation, and understand patterns of police
              intervention across different crime categories. This is the yearly
              analysis of arrests according to the different crime types.
            </Typography>
            <Link to="/police_impact">
              <button style={{ padding: '10px', marginTop: '10px' }}>
                View Graph
              </button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Cross-City Benchmarking of Crime Trends
            </Typography>
            <Typography>
              Cross-city benchmarking enables a comparative analysis of crime
              patterns between Chicago and Los Angeles. By examining attributes
              such as Primary Type, Crime Description, and location-specific
              identifiers (Community Area, District, Beat, Ward), this use case
              highlights unique and common trends across cities. Temporal fields
              like Year and Date fa- cilitate comparisons of crime trends across
              seasons or years, supporting a detailed examination of how crime
              dynamics vary geographically. This approach identifies successful
              strategies from one city that may be adapted by the other,
              promoting shared knowledge and enhancing public safety across
              regions.
            </Typography>
            <Link to="/cross_city">
              <button style={{ padding: '10px', marginTop: '10px' }}>
                View Graph
              </button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
