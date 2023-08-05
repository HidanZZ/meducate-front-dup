import React, { ReactElement, useEffect, useState,useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon , InfoWindow  } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { TableBodyRowType } from "src/views/pages/dashboard/TableOfPediatricians";
import AnalyticsDashboard from 'src/services/analyticsDashboard';


// Interface for a single coordinate point in the GeoJSON data
interface CoordinatePoint {
  0: number;
  1: number;
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
  properties: {
    [key: string]: any;
    regionColor: string; // Add this property to store the color for each region
  };
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
  category: string ;

}

const MoroccoMap = ({
  medicalsData,
  onMarkerClick,
  center,
  zoom,
  selectedMedical,
  category

}: MoroccoMapProps): ReactElement => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const handleMarkerClick = (medical: MedicalData) => {
    onMarkerClick(medical);
  };


  const [geoJsonData, setGeoJsonData] = useState<RegionData | null>(null);

  const [mapsApiLoaded, setMapsApiLoaded] = useState(false);

  const [minCategory, setMinCategory] = useState(0);
  const [maxCategory, setMaxCategory] = useState(0);

  const [categoryData, setCategoryData] = useState<{ [regionId: string]: number }>({});
  const [infoWindowContent, setInfoWindowContent] = useState<JSX.Element | null>(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [selectedMarkerPosition, setSelectedMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeoJsonData = async () => {
      try {
        const response = await fetch('/geojson/marocRegions.geojson');
        const dataGeoJSON: GeoJSONFeatureCollection = await response.json();
        const responseCategoryData = await AnalyticsDashboard.getCategoryCountsByRegion(category); // Replace with the API endpoint that returns the hospital data
        const categoryData: { [regionId: string]: number } = await responseCategoryData;
        
        // Calculate the minimum and maximum population values to determine the range for the gradient
        let minCategory= Number.MAX_VALUE;
    let maxCategory = Number.MIN_VALUE;

    Object.values(categoryData).forEach((count) => {
      if (count < minCategory) {
        minCategory= count;
      }
      if (count > maxCategory) {
        maxCategory = count;
      }
    });
  

        // Define the colors for the gradient (replace these with your desired colors)
        const startColor =[222, 148, 148];// Red (RGB values)
        const endColor =  [166, 6, 6];  // White (RGB values)
    
        // Calculate the color for each region based on its population using the gradient formula
        dataGeoJSON.features.forEach((feature) => {
          const regionId = feature.properties.Indice.toString();
          const categoryCount = categoryData[regionId];
          const t = (categoryCount - minCategory) / (maxCategory - minCategory); // Normalize 
          const color = startColor.map((startValue, index) => Math.round(startValue + t * (endColor[index] - startValue))); // Calculate the interpolated color
          if (!categoryCount) {
            feature.properties.regionColor = 'rgb(255,255,255)';
          } else {
          feature.properties.regionColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`; // Store the color as an "rgb(r, g, b)" string
      }});

      const handleMarkerClick = (medical: MedicalData) => {
        onMarkerClick(medical);
      };

        setGeoJsonData(dataGeoJSON);
        setMinCategory(minCategory);
        setMaxCategory(maxCategory);
        setCategoryData(categoryData);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };
    

    fetchGeoJsonData();
  }, [category]);


// Custom marker icons for each category

const createCustomMarkerIcon = (color: string) => {
  const defaultMarkerUrl = `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
  const markerIcon = {
    url: defaultMarkerUrl,
  };
  return markerIcon;
};

const mapRef = useRef<GoogleMap | null>(null); // Add this line


  return (
    <div>
  
      
    <LoadScript googleMapsApiKey={"AIzaSyAKqF-5P1loXKAbCWgN5oU8a0PVDAjCYy0"} onLoad={() => setMapsApiLoaded(true)}>
      <GoogleMap ref={mapRef} mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
      {medicalsData.map((medical) => {

        //Get the category of the pediatrician (e.g., hospital, clinic, pharmacy)
        const category = medical.category[0].libelle.toLowerCase();

        // Define the desired color based on the category (you can use any color logic here)
        const markerColor = category === 'hospital' ? 'red' : category === 'clinical' ? 'yellow' :category==='doctor'?'blue':category==='pharmacy'?'blue':category==='cabinet'?'green':category==='centre'?'orange': 'red';
        // Create the custom marker icon based on the desired color
        const icon = createCustomMarkerIcon(markerColor);

        if (!mapsApiLoaded) {
          return <div>Loading...</div>;
        }
         
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
{geoJsonData && category !== 'All' &&
            geoJsonData.features.map((feature, index) => (
              <Polygon
                key={index}
                paths={feature.geometry.coordinates[0].map((coord: CoordinatePoint) => ({
                  lat: coord[1],
                  lng: coord[0],
                }))}
                options={{
                  strokeColor: feature.properties.regionColor,
                  strokeOpacity: hoveredRegion === feature.properties.Indice.toString() ? 1 : 0.2, // Highlight if hovered
                  strokeWeight: hoveredRegion === feature.properties.Indice.toString() ? 2 : 1, // Highlight if hovered
                  fillColor: feature.properties.regionColor,
                  fillOpacity: 0.7,
                }}
                onMouseOver={() => {
                  const featureProperties = feature.properties;
                  const regionName = featureProperties.nom_region; // Assurez-vous que "nom_region" est le bon nom de propriété
                  
                  const categoryCount = categoryData && categoryData[featureProperties.Indice.toString()] ? categoryData[featureProperties.Indice.toString()] : 0;
                  const populationCount = featureProperties.Population; // Assurez-vous que "population" est le bon nom de propriété
                  
                  const medicalsPerPopulation = populationCount !== 0 ? categoryCount / populationCount : 0;
                  
                  const content  = (
                    <div style={{ fontFamily: 'Arial, sans-serif' }}>
                      <p style={{ fontWeight: 'bold' }}>{regionName}</p>
                      <p>Number of {category}: {categoryCount !== undefined ? categoryCount : 0}</p>
                      <p>Population: {populationCount}</p>
                      <p>{category} per capita: {medicalsPerPopulation.toFixed(2)}</p>
                    </div>
                  );
                  
                  setInfoWindowContent(content);
                  setHoveredRegion(featureProperties.Indice.toString());
                  setSelectedMarkerPosition({
                    lat: feature.geometry.coordinates[0][0][1],
                    lng: feature.geometry.coordinates[0][0][0],
                  });
                  setIsInfoWindowOpen(true);
                }}
                onMouseOut={() => {
                  setInfoWindowContent(null);
                  setIsInfoWindowOpen(false);
                }}
              />
            ))}
          {isInfoWindowOpen && infoWindowContent && (
            <InfoWindow
              position={selectedMarkerPosition!}
              onCloseClick={() => setIsInfoWindowOpen(false)}
            >
              <div>{infoWindowContent}</div>
            </InfoWindow>
          )}
      </GoogleMap>
    </LoadScript>
    {category!=='All' && (
      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center' }}>
  <div style={{ width: '100px', textAlign: 'right', marginRight: '10px', color: 'black' }}>
    0
  </div>
  <div style={{ flex: '1', height: '15px', background: `linear-gradient(to right, white, rgb(${[222, 148, 148].join(', ')}), rgb(${[166, 6, 6].join(', ')}))`, marginRight: '10px', position: 'relative' }}>
  </div>
  <div style={{ width: '100px', textAlign: 'left', marginLeft: '10px', color: 'black' }}>
    {maxCategory}
  </div>
</div>

)}
    </div>
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
        category={category}
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