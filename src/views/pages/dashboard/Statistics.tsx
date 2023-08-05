import { ReactElement, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ServiceAnalyticsDashboard from 'src/services/analyticsDashboard';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface DataType {
  stats: Record<string, any>;
  title: string;
  color: ThemeColor;
  icon: ReactElement;

}
interface StatisticsProps {
  cityValue: string;
  category:string;
  speciality:string
}

const AnalyticsTransactionsCard = (props: StatisticsProps) => {
  const { cityValue,category,speciality } = props

  const [statsData, setStatsData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const data1=await ServiceAnalyticsDashboard.getMedicalDataByFilters('All','All','All');
        const data2=await ServiceAnalyticsDashboard.getMedicalDataByFilters(cityValue,category,speciality);
        const data3=await ServiceAnalyticsDashboard.getMedicalPositifDataByFilters(cityValue,category,speciality);
        const data4=await ServiceAnalyticsDashboard.getMedicalNegatifDataByFilters(cityValue,category,speciality);
        const updatedSalesData: DataType[] = [
          {
            stats: data1.length,
            title: 'General Data',
            color: 'primary',
            icon: <Icon icon='mdi:view-module' />
          },
          {
            stats: data2.length,
            title: 'Filtred Data',
            color: 'success',
            icon: <Icon icon='mdi:view-dashboard' />
          },
          {
            stats: data3,
            title: 'positive comments',
            color: 'warning',
            icon: <Icon icon='mdi:plus' />
          },
          {
            stats: data4,
            title: 'negative comments',
            color: 'info',
            icon: <Icon icon='mdi:minus' />
          }
        ];

        setStatsData(updatedSalesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [cityValue,category,speciality]);

  const renderStats = () => {
    return statsData.map((item: DataType, index: number) => {
      const statValue = item.stats ? item.stats.toString() : '';

      return (
        <Grid item xs={12} sm={3} key={index}>
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              variant='rounded'
              color={item.color}
              sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem' } }}
            >
              {item.icon}
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>{item.title}</Typography>
              <Typography variant='h6'>{statValue}</Typography>
            </Box>
          </Box>
        </Grid>
      );
    });
  };

  return (
    <Card>
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTransactionsCard;