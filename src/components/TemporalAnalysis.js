import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const SPARQLQueryResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to extract the plain value from a URI or literal
  const getPlainValue = (value) => {
    if (!value) return '';
    // If it's a URI, extract the local name
    if (value.startsWith('http')) {
      const segments = value.split('#');
      return segments.length > 1 ? segments[1] : value.split('/').pop();
    }
    // Return the value as-is if it's a literal
    return value;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/repositories/Vedanya', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/sparql-query',
            Accept: 'application/json',
          },
          body: `
            PREFIX smw: <http://www.semanticweb.org/kruthi/ontologies/2024/11/untitled-ontology-13#>

            SELECT DISTINCT ?crm_cd_desc ?crime_year (COUNT(?dr_no) AS ?crimeCount)
            WHERE {
              ?dr_no smw:linkedToCrimeCode ?crm_cd .
              ?crm_cd smw:hasDescription ?crm_cd_desc .

              FILTER (?crm_cd_desc = smw:THEFT)

              ?dr_no smw:occuredOn ?crime_year .
            }
            GROUP BY ?crm_cd_desc ?crime_year
            ORDER BY DESC(?crimeCount)
            LIMIT 50
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
              <TableCell>Description</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Crime Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{getPlainValue(row.crm_cd_desc?.value)}</TableCell>
                <TableCell>{getPlainValue(row.crime_year?.value)}</TableCell>
                <TableCell>{getPlainValue(row.crimeCount?.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SPARQLQueryResults;
