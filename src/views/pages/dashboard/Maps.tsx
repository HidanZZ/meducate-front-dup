import React, { ReactElement, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface RegionData {
  name: string;
  coordinates: Array<{ lat: number; lng: number }>;
  pediatricianCount: number;
}

interface PediatricianData {
  name: string;
  address: string;
  phone_number: number;
  latitude: number;
  longitude: number;
  city: string;
}

interface MoroccoMapProps {
  pediatriciansData: PediatricianData[];
  onMarkerClick: (pediatrician: PediatricianData) => void;
  center: { lat: number; lng: number };
  zoom: number;
}

const MoroccoMap = ({
  pediatriciansData,
  onMarkerClick,
  center,
  zoom,
}: MoroccoMapProps) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const handleMarkerClick = (pediatrician: PediatricianData) => {
    onMarkerClick(pediatrician);
  };
const apiKey = process.env.KEY_GOOGLE_MAPS ?? '';
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
        {pediatriciansData.map((pediatrician) => (
          <Marker
            key={pediatrician.name}
            position={{ lat: pediatrician.latitude, lng: pediatrician.longitude }}
            onClick={() => handleMarkerClick(pediatrician)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

const Maps = ({ cityValue }: { cityValue: string }): ReactElement => {
  // Définir le state pour le centre initial de la carte
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 31.7917, lng: -7.0926 });
  // Définir le state pour le niveau de zoom initial de la carte
  const [zoom, setZoom] = useState<number>(6);
  

  const [pediatriciansData, setPediatriciansData] = useState<PediatricianData[]>([]);
  const [selectedPediatrician, setSelectedPediatrician] = useState<PediatricianData | undefined>();

  useEffect(() => {
    const fetchPediatricians = async () => {
      try {
        const response = await fetch('http://localhost:8000/pediatres');
        const data = await response.json();
        if (Array.isArray(data)) {
          setPediatriciansData(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données des pédiatres :', error);
      }
    };

    fetchPediatricians();
  }, []);

  const [filteredPediatriciansData, setFilteredPediatriciansData] = useState<PediatricianData[]>([]);
  useEffect(() => {
    if (cityValue === '') {
      setFilteredPediatriciansData(pediatriciansData);
    } else {
      const filteredData = pediatriciansData.filter((pediatrician) => pediatrician.city === cityValue);
      setFilteredPediatriciansData(filteredData);
    }
  }, [cityValue, pediatriciansData]);

  const handleMarkerClick = (pediatrician: PediatricianData) => {
    setSelectedPediatrician(pediatrician);
    // Vous pouvez définir d'autres actions ici si nécessaire lorsque le marqueur est cliqué.
    setCenter({ lat: pediatrician.latitude, lng: pediatrician.longitude });
    setZoom(20);
  };

  return (
    <Card>
      <MoroccoMap
        pediatriciansData={filteredPediatriciansData}
        onMarkerClick={handleMarkerClick}
        center={center}
        zoom={zoom}
      />
      {selectedPediatrician && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedPediatrician.name}
            </Typography>
            <Typography color="text.secondary">Address: {selectedPediatrician.address}</Typography>
            <Typography color="text.secondary">Phone: {selectedPediatrician.phone_number}</Typography>
          </CardContent>
        </Card>
      )}
    </Card>
  );
};

export default Maps;
