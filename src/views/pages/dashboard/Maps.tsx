import React from 'react';
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
  coordinates: { lat: number; lng: number };
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


  // const pediatricianIcon = {
  //   url: 'data:image/png;base64,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',
  //   scaledSize: {
  //     width: 32, // Adjust the width of the icon as needed
  //     height: 32, // Adjust the height of the icon as needed
  //   },
  // };
  
  const markerStyle = {
    fillColor: '#ff0000', // Remplacez par la couleur souhaitée
    fillOpacity: 0.6,
    strokeWeight: 0,
    scale: 4, // Taille du marqueur
  };

  return (
    <LoadScript googleMapsApiKey="YOUR KEY">
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
          position={pediatrician.coordinates}
          
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

const pediatriciansData: PediatricianData[] = [
    {
      name: 'Pediatrician 1',
      coordinates: { lat: 31.7, lng: -8.0 },
    },
    {
      name: 'Pediatrician 2',
      coordinates: { lat: 32.0, lng: -8.5 },
    },
    // Add more pediatricians as needed
  ];

  return (
      <Card>
        {/* <CardHeader title="Maps" /> */}
        <MoroccoMap regionsData={regionsData} pediatriciansData={pediatriciansData} />
      </Card>
  );
};

export default Maps;
