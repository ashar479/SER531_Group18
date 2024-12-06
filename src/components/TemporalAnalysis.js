import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SPARQLQueryResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7200/sparql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/sparql-query',
            Accept: 'application/json',
          },
          body: `
            SELECT * WHERE {
              ?s ?p ?o .
            } LIMIT 100
          `,
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result.results.bindings);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        SPARQL Query Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Predicate</TableCell>
              <TableCell>Object</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.s.value}</TableCell>
                <TableCell>{row.p.value}</TableCell>
                <TableCell>{row.o.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SPARQLQueryResults;
