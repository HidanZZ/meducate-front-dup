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
  pediatriciansCount: number;
  total:number;
}

interface PediatricianData {
  _id: string;
  count: number;
}

const DistributionOfPediatricians = () => {
  const [averageScoreData, setAverageScoreData] = useState<CityData[]>([]);
  const [pediatriciansData, setPediatriciansData] = useState<PediatricianData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsCountData: CityData[] = await AnalyticsDashboard.getAveragePositiveScoreByCity();
        const pediatriciansCountData: PediatricianData[] = await AnalyticsDashboard.getPediatriciansCountByCity();
        const total = calculateTotalPediatriciansCount(pediatriciansCountData);
       
        

        // Find the top 3 cities based on totalReviews
        const sortedReviewsData = reviewsCountData.sort((a: CityData, b: CityData) => b.averageScore- a.averageScore);
        const topThreeCities = sortedReviewsData.slice(0, 3);

        // Find the total pediatricians count for each city
        const pediatriciansData = topThreeCities.map((city: CityData) => {
          const pediatrist = pediatriciansCountData.find((item: PediatricianData) => item._id === city.city);
          return {
            city: city.city,
            averageScore: city.averageScore,
            pediatriciansCount: pediatrist?.count || 0,
            total,
          };
        });

        setAverageScoreData(pediatriciansData);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
 

  const calculateTotalPediatriciansCount = (data: PediatricianData[]) => {
    const totalPediatriciansCount = data.reduce((total: number, item: PediatricianData) => total + item.count, 0);
    return totalPediatriciansCount;
  };
  
  const getPercentageByCity = () => {
    const totalPediatriciansCount = calculateTotalPediatriciansCount(pediatriciansData);
    return averageScoreData.map((item: CityData) => Math.round((item.pediatriciansCount / item.total) * 100));
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
    colors: ['#fdd835', '#32baff', '#7367f0'],
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
      <CardHeader title="Top pediatricians' cities" />
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
