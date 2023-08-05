import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { ApexOptions } from 'apexcharts';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import AnalyticsDashboard from 'src/services/analyticsDashboard';
import { it } from 'node:test';

interface CityData {
  city: string;
  averageScore: number;
  medicalsCount: number;
  total:number;
}

interface MedicalData {
  _id: string;
  count: number;
}
interface Prop {
  category: string
 
}
const DistributionOfPediatricians = (props: Prop) => {
  const { category } = props
  const [averageScoreData, setAverageScoreData] = useState<CityData[]>([]);
  const [medicalsData, setMedicalsData] = useState<MedicalData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsCountData: CityData[] = await AnalyticsDashboard.getAveragePositiveScoreByCity(category);
        const totals = await AnalyticsDashboard.getMedicalDataByFilters('All',category,'All');
       
        const total=totals.length;

        // Find the top 5 cities based on totalReviews
        const sortedReviewsData = reviewsCountData.sort((a: CityData, b: CityData) => b.averageScore- a.averageScore);
        const topThreeCities = sortedReviewsData.slice(0, 5);

        // Find the total pediatricians count for each city
        const medicalsData = await Promise.all (topThreeCities.map(async (city: CityData) => {
          const categorie = await AnalyticsDashboard.getMedicalDataByFilters(city.city, category, 'All');
          return {
            city: city.city,
            averageScore: city.averageScore,
            medicalsCount: categorie?.length || 0,
            total,
          };
        }));

        setAverageScoreData(medicalsData);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

  
 

  const calculateTotalMedicalsCount = (data: MedicalData[]) => {
    const totalMedicalsCount = data.reduce((total: number, item: MedicalData) => total + item.count, 0);
    return totalMedicalsCount;
  };
  
  const getPercentageByCity = () => {
    const totalPediatriciansCount = calculateTotalMedicalsCount(medicalsData);
    return averageScoreData.map((item: CityData) => Math.round((item.medicalsCount / item.total) * 100));
  };
  

  const options: ApexOptions = {
    stroke: { lineCap: 'round' },
    labels: averageScoreData.map((item: CityData) => item.city),
    legend: {
      show: true,
      position: 'bottom',
      labels: {},
      markers: {
        offsetX: -3,
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    colors: ['#fdd835', '#32baff', '#7367f0', '#2FFFFF', '#100000'],
    plotOptions: {
      radialBar: {
        hollow: { size: '30%' },
        track: {
          margin: 15,
          background: '#f5f5f5',
        },
        dataLabels: {
          name: {
            fontSize: '2rem',
          },
          value: {
            fontSize: '1rem',
            color: '#888ea8',
          },
          total: {
            show: true,
            fontWeight: 400,
            label: 'All cities',
            fontSize: '1.125rem',
            color: '#888ea8',
            formatter: (w: any) => {
              return '100%';
            },
          },
        },
      },
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30,
      },
    },
  };

  return (
    <Card>
      <CardHeader title="Top cities" />
      <CardContent>
        <ReactApexcharts
          type="radialBar"
          height={400}
          options={options}
          series={getPercentageByCity()}
        />
      </CardContent>
    </Card>
  );
};

export default DistributionOfPediatricians;