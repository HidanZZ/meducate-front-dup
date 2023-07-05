// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import AnalyticsTable from 'src/views/pages/dashboard/TableOfPediatricians'

import DistributionOfPediatricians from 'src/views/pages/dashboard/DistributionOfPediatricians'
import AnalyticsTransactionsCard from 'src/views/pages/dashboard/Statistics'
import TopNamesBySentimentChart from 'src/views/pages/dashboard/Maps'

const AnalyticsDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        
        <Grid item xs={12} md={6} lg={6}>
          <DistributionOfPediatricians />
        </Grid>
        
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsTransactionsCard />
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <AnalyticsTable />
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <TopNamesBySentimentChart />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
