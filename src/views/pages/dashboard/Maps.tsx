import React, { ReactElement,useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Polygon, Marker, InfoWindow } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface RegionData {
  name: string;
  coordinates: Array<{ lat: number; lng: number }>;
  pediatricianCount: number;
}
interface Maps {

  cityValue: string
}

interface PediatricianData {
  name: string;
  address: string;
  phone_number: number;
  latitude: number;
  longitude: number 
  ville:string
}


const MoroccoMap = ({
  regionsData,
  pediatriciansData,
  onMarkerClick,
  mapRef,
}: {
  regionsData: RegionData[];
  pediatriciansData: PediatricianData[];
  onMarkerClick: (pediatrician: PediatricianData) => void;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
}) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const markerStyle = {
    fillColor: '#ff0000',
    fillOpacity: 0.6,
    strokeWeight: 0,
    scale: 4,
  };

  const center= { lat: 31.7917, lng: -7.0926  };

  const apiKey = process.env.KEY_GOOGLE_MAPS ?? '';

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={6}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {pediatriciansData.map((pediatrician) => (
          <Marker
            key={pediatrician.name}
            position={{ lat: pediatrician.latitude, lng: pediatrician.longitude }}
            onClick={() => onMarkerClick(pediatrician)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

const RegionPolygon = ({ paths, options }: { paths: Array<{ lat: number; lng: number }>; options: any }) => (
  <Polygon paths={paths} options={options} />
);

const getColorByPediatricians = (pediatricianCount: number) => {
  const colorScale = [
    { count: 0, color: '#e5f5e0' },
    { count: 10, color: '#a1d99b' },
    { count: 20, color: '#74c476' },
    { count: 30, color: '#31a354' },
    { count: 40, color: '#006d2c' },
  ];

  const color = colorScale.find((item) => pediatricianCount <= item.count)?.color || '#ffffff';

  return color;
};

const Maps =  (props: Maps): ReactElement => {
  const { cityValue } = props
  const regionsData: RegionData[] = [
    // ...
  ];

  const [pediatriciansData, setPediatriciansData] = useState<PediatricianData[]>([]);
  const [filteredPediatriciansData, setFilteredPediatriciansData] = useState<PediatricianData[]>([])
  const [selectedPediatrician, setSelectedPediatrician] = useState<PediatricianData | undefined>();
  const [mapZoom, setMapZoom] = useState<number>(6);
 
  const mapRef = useRef<google.maps.Map | null>(null);
  useEffect(() => {
    const fetchPediatricians = async () => {
      try {
        const response = await fetch('http://localhost:8000/pediatres'); 
        const data = await response.json();
        setPediatriciansData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des pédiatres :', error);
      }
    };

    fetchPediatricians();
  }, []);
  

  useEffect(() => {
    const filteredData = pediatriciansData.filter(pediatrician => pediatrician.ville === cityValue)
    setFilteredPediatriciansData(filteredData)
  }, [cityValue, pediatriciansData])
  const handleMarkerClick = (pediatrician: PediatricianData) => {
    setSelectedPediatrician(pediatrician);

    // const bounds = new window.google.maps.LatLngBounds();
    // bounds.extend({ lat: pediatrician.latitude, lng: pediatrician.longitude });
    // mapRef.current?.fitBounds(bounds);
  };

 
  return (
      <Card>
        {/* <CardHeader title="Maps" /> */}
        <MoroccoMap
        regionsData={regionsData}
        pediatriciansData={filteredPediatriciansData}
        onMarkerClick={handleMarkerClick}
        mapRef={mapRef}
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
