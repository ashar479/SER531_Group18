import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { Box, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';

const CrimeHotspots = () => {
  const [crimeData, setCrimeData] = useState([]);

  const fetchCrimeData = async () => {
    const query = `
      PREFIX smw: <http://www.semanticweb.org/kruthi/ontologies/2024/11/untitled-ontology-13#>
      SELECT ?location ?latitude ?longitude (COUNT(?crime) AS ?crimeCount)
      WHERE {
        ?crime smw:occursAt ?location ;
               a smw:dr_no .
        ?location smw:hasLatitudeDimension ?latitude ;
                  smw:hasLongitudeDimension ?longitude .
      }
      GROUP BY ?location ?latitude ?longitude
      ORDER BY DESC(?crimeCount)
    `;

    const endpointUrl = 'YOUR_GRAPHDB_ENDPOINT_URL';
    const queryUrl = `${endpointUrl}?query=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(queryUrl, {
        headers: {
          'Accept': 'application/sparql-results+json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from GraphDB:', errorText);
        throw new Error(`Failed to fetch data: HTTP ${response.status}`);
      }

      const rawData = await response.text();
      console.log('Raw Response:', rawData);

      const data = JSON.parse(rawData);

      const formattedData = data.results.bindings.map(item => {
        const latitude = parseFloat(item.latitude.value.replace('smw:', ''));
        const longitude = parseFloat(item.longitude.value.replace('smw:', ''));
        const crimeCount = parseInt(item.crimeCount.value, 10);
        return { latitude, longitude, crimeCount };
      });

      console.log('Formatted Crime Data:', formattedData);
      setCrimeData(formattedData);
    } catch (error) {
      console.error('Error fetching crime data:', error);
      setCrimeData([
        { latitude: 34.0522, longitude: -118.2437, crimeCount: 150 },
        { latitude: 34.0523, longitude: -118.2438, crimeCount: 75 },
        { latitude: 34.05, longitude: -118.25, crimeCount: 30 },
      ]);
    }
  };

  useEffect(() => {
    fetchCrimeData();
  }, []);

  const getMarkerColor = (crimeCount) => {
    if (crimeCount > 100) return 'red';
    if (crimeCount > 50) return 'orange';
    if (crimeCount > 25) return 'yellow';
    return 'green';
  };

  const defaultCenter =
    crimeData.length > 0
      ? [crimeData[0].latitude, crimeData[0].longitude]
      : [34.0522, -118.2437];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Crime Hotspot Map
      </Typography>
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {crimeData.map((crime, index) => (
          <CircleMarker
            key={index}
            center={[crime.latitude, crime.longitude]}
            radius={10}
            color={getMarkerColor(crime.crimeCount)}
            fillOpacity={0.7}
          >
            <Tooltip>
              <Typography variant="body2">
                Crime Count: {crime.crimeCount}
              </Typography>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default CrimeHotspots;
