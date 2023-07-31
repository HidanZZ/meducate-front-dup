// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
// ** React Imports
import { useEffect, useState } from 'react';


// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Alert } from '@mui/material';

// Fonction pour générer une couleur aléatoire
const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

interface StatisticsProps {
  cityValue: string
}
// ** Effect to fetch data from the API

const ApexDonutChart = (props:StatisticsProps) => {
  const { cityValue } = props

  // ** State
const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {

          let apiUrl = 'http://localhost:8000/getMedicalDataCountByCategory';
          if (cityValue !== 'All') {
            apiUrl = 'http://localhost:8000/getMedicalDataCountsByCity';
          }
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        if (cityValue !== 'All') {
          setData([{ [cityValue]: jsonData[cityValue] }]);
        } else {
          setData(jsonData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

  }, [cityValue]);
 
interface MedicalData {
  _id: { libelle: string; speciality: string }[];
  count: number;
}

function getMyDataLabelsAndColors(cityData: { [key: string]: { [key: string]: number } } | null) {
  if (!cityData || Object.keys(cityData).length === 0 || Object.keys(cityData[Object.keys(cityData)[0]]).length === 0) {
    // Handle the case where cityData is null, an empty object, or the first property is an empty object
    return { labels: [], colors: [] };
  }

  const labels = Object.keys(cityData[Object.keys(cityData)[0]]);
  const colors = labels.map(() => generateRandomColor());
  console.log("Labels:", labels);
  console.log("Colors:", colors);
  return { labels, colors };
}
function getAllMyDataLabelsAndColors(allMyData: MedicalData[] | null) {
  if (!Array.isArray(allMyData) || allMyData.length === 0 || !allMyData[0]?._id?.length) {
    // Handle the case where allMyData is not an array, is empty, or the first item has no _id array
    return { labels: [], colors: [] };
  }

  const labels = allMyData.map((item) => item._id[0].libelle || '');
  const colors = allMyData.map(() => generateRandomColor());
  console.log("Labels:", labels);
  console.log("Colors:", colors);
  return { labels, colors };
}


  // ** Hook
  const theme = useTheme()
  const { labels, colors } = cityValue === 'All'
  ? getAllMyDataLabelsAndColors(data)
  : getMyDataLabelsAndColors(data && data[0] ? data[0] : null);

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: labels, // Utilisez les libellés définis en fonction de cityValue
    colors: colors,
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }
 // ** Séries pour le graphique
// ** Séries pour le graphique
let series = [];
if (cityValue === 'All') {
  // Calculate 'series' when clicking on "All"
  series = data ? data.map((item) => item.count) : [];
} else {
  // Calculate 'series' when clicking on a specific city
  const cityData = data && data[0] ? data[0][cityValue] : null;
  series = cityData ? Object.values(cityData) : [];
}
 console.log('***', data); // Affichez le contenu de data dans la console
 console.log("Options:", options);


  return (
    <Card>
      <CardHeader
        // title='Expense Ratio'
        subheader='Distribution of categories'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <ReactApexcharts type='donut' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexDonutChart
