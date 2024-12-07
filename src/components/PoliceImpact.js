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
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            
            SELECT DISTINCT ?year ?crm_cd (COUNT(?dr_no) AS ?crimeCount) (COUNT(?arrest) AS ?arrestCount)
            WHERE {
                ?crm_cd smw:impactedBy ?arrest .
                ?dr_no smw:linkedToCrimeCode ?crm_cd .
                ?dr_no smw:occursAt ?location .
                ?dr_no smw:occuredOn ?year .
                ?arrest smw:hasArrestStatus "True" .
            }
            GROUP BY ?year ?crm_cd
            ORDER BY ?year DESC(?crimeCount)
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
              <TableCell>Year</TableCell>
              <TableCell>Crime Code</TableCell>
              <TableCell>Crime Count</TableCell>
              <TableCell>Arrest Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{getPlainValue(row.year?.value)}</TableCell>
                <TableCell>{getPlainValue(row.crm_cd?.value)}</TableCell>
                <TableCell>{getPlainValue(row.crimeCount?.value)}</TableCell>
                <TableCell>{getPlainValue(row.arrestCount?.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SPARQLQueryResults;
