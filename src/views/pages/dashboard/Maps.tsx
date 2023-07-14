import React from 'react';
import { useEffect,  useState} from 'react'
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

interface RegionData {
  name: string;
  coordinates: Array<{ lat: number; lng: number }>;
  pediatricianCount: number;
}

interface PediatricianData {
  name: string;
  latitude: number;
  longitude: number 
}


const MoroccoMap = ({ regionsData, pediatriciansData }: { regionsData: RegionData[]; pediatriciansData: PediatricianData[] }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 31.7917,
    lng: -7.0926,
  };

  
  const markerStyle = {
    fillColor: '#ff0000', // Remplacez par la couleur souhaitée
    fillOpacity: 0.6,
    strokeWeight: 0,
    scale: 4, // Taille du marqueur
  };

  
  const apiKey = process.env.KEY_GOOGLE_MAPS ?? '';
  return (
    <LoadScript googleMapsApiKey={apiKey} >
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
        {/* {regionsData.map((region) => (
          <RegionPolygon
            key={region.name}
            paths={region.coordinates}
            options={{
              fillColor: getColorByPediatricians(region.pediatricianCount),
              fillOpacity: 0.6,
              strokeColor: '#000000',
              strokeOpacity: 1,
              strokeWeight: 1,
            }}
          />
        ))} */}

        {pediatriciansData.map((pediatrician) => (
          <Marker
          key={pediatrician.name}
          position={{ lat: pediatrician.latitude, lng: pediatrician.longitude }}
            
          
        />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

const RegionPolygon = ({ paths, options }: { paths: Array<{ lat: number; lng: number }>; options: any }) => (
  <Polygon
    paths={paths}
    options={options}
  />
);

const getColorByPediatricians = (pediatricianCount: number) => {
  // Define your color scale based on pediatrician count
  // Example: More pediatricians, darker color
  const colorScale = [
    { count: 0, color: '#e5f5e0' },
    { count: 10, color: '#a1d99b' },
    { count: 20, color: '#74c476' },
    { count: 30, color: '#31a354' },
    { count: 40, color: '#006d2c' },
  ];

  // Find the appropriate color based on pediatrician count
  const color = colorScale.find((item) => pediatricianCount <= item.count)?.color || '#ffffff';

  return color;
};

const Maps = () => {
  const regionsData: RegionData[] = [
    {
      name: 'Region Marrakeh-Safi',
      coordinates: [
        {lng:-7.232491632812071,lat:32.37185493947398},
        {lng:-7.055689966768966,lat:31.934026195914598},
        {lng:-7.121990591534484,lat:32.08769263394052},
        {lng:-7.099890383280041,lat:32.2784785901228},
        {lng:-7.232491632812071,lat:32.37185493947398},
        {lng:-7.555154673340326,lat:32.442756520288825},
        {lng:-7.718696214430338,lat:32.56949390140272},
        {lng:-7.926438172031368,lat:32.71836773271886},
        {lng:-8.028099130006524,lat:32.79271164842116},
        {lng:-8.072299546516547,lat:32.63651778989144},
        {lng:-8.067879504865857,lat:32.576943476175146},
        {lng:-8.28888158741995,lat:32.42410360994518},
        {lng:-8.607124586297516,lat:32.41291001175887},
        {lng:-8.881167168664092,lat:32.50987503396797},
        {lng:-9.053548793056507,lat:32.722086402200105},
        {lng:-9.243610584052675,lat:32.30836949799183},
        {lng:-9.283390958913003,lat:32.539689415413164},
        {lng: -9.76959554053127,lat:31.51294503104974},
        {lng:-9.822636040344719,lat:30.953595399726723},
        {lng:-9.690034790811637,lat:30.798056242130983},
        {lng:-9.526493249720545,lat:30.90051285734745},
        {lng:-9.332011417073659,lat:30.885341006200562},
        {lng:-9.221510375796043,lat:30.81324190348124},
        {lng:-9.004928334893663,lat:30.817037943824317},
        {lng:-8.779506210688822,lat:30.976336038186375},
        {lng:-8.76624608573573,lat:30.832220604887524},
        {lng:-8.412642753648527,lat:30.87775417930844},
        {lng: -8.129760087979548,lat:30.946013983555517},
        {lng:-7.409293298854067,lat:31.279026046555614},
        {lng:-7.126410633185117,lat:31.55815228611722},
        {lng:-7.289952174275129,lat:31.738762158456765}

      ],
      pediatricianCount: 25, // Number of pediatricians in Region A
    },
    {
      name: 'Region Casablanca-Settat',
      coordinates: [
        { lat: 33.533, lng: -7.583 }, // Example coordinate 1
        { lat: 33.533, lng: -7.750 }, // Example coordinate 2
        { lat: 33.300, lng: -7.750 }, // Example coordinate 3
        { lat: 33.300, lng: -7.583 }, 
        // Add more coordinates as needed
      ],
      pediatricianCount: 15, // Number of pediatricians in Region B
    },
    // Add more regions...
  ];

  const [pediatriciansData, setPediatriciansData] = useState<PediatricianData[]>([]);

  useEffect(() => {
    const fetchPediatricians = async () => {
      try {
        const response = await fetch('http://localhost:8000/pediatre'); 
        const data = await response.json();
        setPediatriciansData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des pédiatres :', error);
      }
    };

    fetchPediatricians();
  }, []);



  return (
      <Card>
        {/* <CardHeader title="Maps" /> */}
        <MoroccoMap regionsData={regionsData} pediatriciansData={pediatriciansData} />
      </Card>
  );
};

export default Maps;
