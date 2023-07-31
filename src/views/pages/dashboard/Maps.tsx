import React, { ReactElement, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon  } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { TableBodyRowType } from "src/views/pages/dashboard/TableOfPediatricians";
import AnalyticsDashboard from 'src/services/analyticsDashboard';


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

interface ICategory {
  libelle: string;
  speciality: string;
}

interface Sentiments {
  label: string;
  score: number;
}

interface MedicalData {
  name: string;
  address: string;
  phone_number: string;
  latitude: number;
  longitude: number;
  city: string;
  category:ICategory[];

}

interface MoroccoMapProps {
  medicalsData: MedicalData[];
  onMarkerClick: (medical: MedicalData) => void;
  center: { lat: number; lng: number };
  zoom: number;
  selectedMedical: MedicalData | null; 

}

const MoroccoMap = ({
  medicalsData,
  onMarkerClick,
  center,
  zoom,
  selectedMedical

}: MoroccoMapProps): ReactElement => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const handleMarkerClick = (medical: MedicalData) => {
    onMarkerClick(medical);
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


// Custom marker icons for each category

const createCustomMarkerIcon = (color: string) => {
  const defaultMarkerUrl = `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
  const markerIcon = {
    url: defaultMarkerUrl,
  };
  return markerIcon;
};


  return (
    <LoadScript googleMapsApiKey={"AIzaSyAKqF-5P1loXKAbCWgN5oU8a0PVDAjCYy0"}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
      {medicalsData.map((medical) => {

        //Get the category of the pediatrician (e.g., hospital, clinic, pharmacy)
        const category = medical.category[0].libelle.toLowerCase();

        // Define the desired color based on the category (you can use any color logic here)
        const markerColor = category === 'hospital' ? 'yellow' : category === 'clinical' ? 'red' :category==='doctor'?'green':category==='pharmacy'?'blue': 'red';

        // Create the custom marker icon based on the desired color
        const icon = createCustomMarkerIcon(markerColor);
         
          return (
            <Marker
              key={medical.name}
              position={{ lat: medical.latitude, lng: medical.longitude }}
              onClick={() => handleMarkerClick(medical)}
              icon={icon} // Use the custom marker icon based on the category
            />
          );
        })}

                {/* Afficher le cercle rouge autour du marqueur du pédiatre sélectionné */}
                {selectedMedical && (
          <Marker
            position={{ lat: selectedMedical.latitude, lng: selectedMedical.longitude }}
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

const Maps = ({ cityValue,category,speciality,selectedMedicalTable }: { cityValue: string ; category: string ;speciality: string ;  selectedMedicalTable: TableBodyRowType | null;}): ReactElement => {
  // Définir le state pour le centre initial de la carte
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 31.7917, lng: -7.0926 });
  // Définir le state pour le niveau de zoom initial de la carte
  const [zoom, setZoom] = useState<number>(6);
  

  const [medicalsData, setMedicalsData] = useState<MedicalData[]>([]);
  const [selectedMedical, setSelectedMedical] = useState<MedicalData | null>(null); 
  const [medicalTable, setMedicalTable] = useState<TableBodyRowType| null>(null);
  
  useEffect(() => {
    const fetchMedicals = async () => {
      try {
        // Call the service function to fetch medical data
        const data = await AnalyticsDashboard.getMedicalDataByFilters(cityValue, category, speciality);
        console.log(data);
        if (Array.isArray(data)) {
          setMedicalsData(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchMedicals();
  }, [cityValue, category, speciality]);

  const handleMarkerClick = (pediatrician: MedicalData) => {
    setSelectedMedical(pediatrician);


    setCenter({ lat: pediatrician.latitude, lng: pediatrician.longitude });
    setZoom(20);
  };


 
  
  useEffect(() => {
    if (selectedMedicalTable) {
      setCenter({ lat: selectedMedicalTable.latitude, lng: selectedMedicalTable.longitude });
      setZoom(20);
      setSelectedMedical(selectedMedicalTable); 
    }
  }, [selectedMedicalTable, medicalTable]);



    
  return (
    <Card>
      <MoroccoMap
        medicalsData={medicalsData}
        onMarkerClick={handleMarkerClick}
        center={center}
        zoom={zoom}
        selectedMedical={selectedMedical}
      />
      {selectedMedical && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedMedical.name}
            </Typography>
            <Typography color="text.secondary">Address: {selectedMedical.address}</Typography>
            <Typography color="text.secondary">Phone: {selectedMedical.phone_number}</Typography>
          </CardContent>
        </Card>
      )}

 

    </Card>
  );
};

export default Maps;