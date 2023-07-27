import React, { ReactElement, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon  } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { TableBodyRowType } from "src/views/pages/dashboard/TableOfPediatricians";


// Interface for a single coordinate point in the GeoJSON data
interface CoordinatePoint {
  lat: number;
  lng: number;
}

// Interface for the GeoJSON polygon geometry
interface PolygonGeometry {
  coordinates: CoordinatePoint[][];
  type: "Polygon";
}

// Interface for the GeoJSON feature properties (if you have any)
interface FeatureProperties {
  [key: string]: any;
}

// Interface for a single feature in the GeoJSON data
interface GeoJSONFeature {
  type: "Feature";
  properties: FeatureProperties;
  geometry: PolygonGeometry;
}

// Interface for the FeatureCollection in the GeoJSON data
interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// Interface for the RegionData
interface RegionData {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
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
  selectedPediatrician: PediatricianData | null; 

}

const MoroccoMap = ({
  pediatriciansData,
  onMarkerClick,
  center,
  zoom,
  selectedPediatrician

}: MoroccoMapProps): ReactElement => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const handleMarkerClick = (pediatrician: PediatricianData) => {
    onMarkerClick(pediatrician);
  };


  const [geoJsonData, setGeoJsonData] = useState<RegionData | null>(null);

  useEffect(() => {
    const fetchGeoJsonData = async () => {
      try {
        const response = await fetch('/geojson/marrakech_safi.geojson');
        const data = await response.json();
        console.log(data);
        setGeoJsonData(data);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchGeoJsonData();
  }, []);

  return (
    <LoadScript googleMapsApiKey={"AIzaSyAKqF-5P1loXKAbCWgN5oU8a0PVDAjCYy0"}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
        {pediatriciansData.map((pediatrician) => (
          <Marker
            key={pediatrician.name}
            position={{ lat: pediatrician.latitude, lng: pediatrician.longitude }}
            onClick={() => handleMarkerClick(pediatrician)}
          />
        ))}

                {/* Afficher le cercle rouge autour du marqueur du pédiatre sélectionné */}
                {selectedPediatrician && (
          <Marker
            position={{ lat: selectedPediatrician.latitude, lng: selectedPediatrician.longitude }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: 'red',
              fillOpacity: 0.2,
              scale: 13,
              strokeColor: 'red',
              strokeOpacity: 0.5,
            }}
          />
        )}
     {geoJsonData && geoJsonData.features.map((feature, index) => (
          <Polygon
            key={index}
            paths={feature.geometry.coordinates[0].map((coord) => ({ lat: coord.lat, lng: coord.lng }))}
            options={{
              strokeColor: "#FF0000", // Red stroke color
              strokeOpacity: 0.5, // Red stroke opacity
              fillColor: "#FF0000", // Red fill color
              fillOpacity: 0.1, // Red fill opacity
            }}
          />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

const Maps = ({ cityValue, selectedPediatricianTable }: { cityValue: string ; selectedPediatricianTable: TableBodyRowType | null;}): ReactElement => {
  // Définir le state pour le centre initial de la carte
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 31.7917, lng: -7.0926 });
  // Définir le state pour le niveau de zoom initial de la carte
  const [zoom, setZoom] = useState<number>(6);
  

  const [pediatriciansData, setPediatriciansData] = useState<PediatricianData[]>([]);
  const [selectedPediatrician, setSelectedPediatrician] = useState<PediatricianData | null>(null); 
  const [pediatricianTable, setPediatricianTable] = useState<TableBodyRowType| null>(null);
  
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
    if (cityValue === 'All') {
      setFilteredPediatriciansData(pediatriciansData);
    } else {
      const filteredData = pediatriciansData.filter((pediatrician) => pediatrician.city === cityValue);
      setFilteredPediatriciansData(filteredData);
    }
  }, [cityValue, pediatriciansData]);

  const handleMarkerClick = (pediatrician: PediatricianData) => {
    setSelectedPediatrician(pediatrician);


    setCenter({ lat: pediatrician.latitude, lng: pediatrician.longitude });
    setZoom(20);
  };


 
  
  useEffect(() => {
    if (selectedPediatricianTable) {
      setCenter({ lat: selectedPediatricianTable.latitude, lng: selectedPediatricianTable.longitude });
      setZoom(20);
      setSelectedPediatrician(selectedPediatricianTable); 
    }
  }, [selectedPediatricianTable, pediatricianTable]);



    
  return (
    <Card>
      <MoroccoMap
        pediatriciansData={filteredPediatriciansData}
        onMarkerClick={handleMarkerClick}
        center={center}
        zoom={zoom}
        selectedPediatrician={selectedPediatrician}
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