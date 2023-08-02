import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import AnalyticsDashboard from 'src/services/analyticsDashboard';

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


import { useTheme } from '@mui/material/styles'; 
const columnColors = {
   bg: '#FFE211',
   series1: '#008000', 
   series2: '#FF7f00', 
   series3: '#FFFF00', 
   series4:'#0000FF' , 
   series5:'#FF0000'
};

const ApexColumnChart = () => {
  
  // ** Hook
  const theme = useTheme()
  const [medicalData, setMedicalData] = useState([]);

  // Définir le type pour categoryNames
  const [categoryNames, setCategoryNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchMedicalData = async () => {
      try {
        const data = await AnalyticsDashboard.getMedicalDataCountsByCity();
        setMedicalData(data);

        // Extraire tous les noms de catégories disponibles dans toutes les villes
        const categoryNames = Object.keys(data).reduce((acc: string[], cityName: string) => {
          const cityData = data[cityName];
          const cityCategoryNames = Object.keys(cityData);
          return [...acc, ...cityCategoryNames];
        }, []);

        // Filtrer les noms de catégories pour qu'il n'y ait pas de doublons
        const uniqueCategoryNames = Array.from(new Set(categoryNames));

        setCategoryNames(uniqueCategoryNames);

      } catch (error) {
        console.error('Error while fetching medical data:', error);
      }
    };

    fetchMedicalData();
  }, []);
  
  // ** Options and Series
  const options: ApexOptions = {
   
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [columnColors.series1, columnColors.series2,columnColors.series3,columnColors.series4,columnColors.series5],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
 
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: Object.keys(medicalData),
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    
  };


  const series = categoryNames.map((categoryName) => ({
    name: categoryName,
    data: Object.values(medicalData).map((data) => data[categoryName] || 0),
  }));
  
  return (
    <Card>
    <CardHeader title={`Distribution of categories by city`} />
    <CardContent>
      {/* Your JSX code here */}
      <ReactApexcharts type="bar" height={400} options={options} series={series} />
    </CardContent>
    </Card>
  );
};

export default ApexColumnChart;