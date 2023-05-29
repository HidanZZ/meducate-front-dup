
import DashboardService from 'src/services/dashboard'
import { Organization } from 'src/types/apps/dashboard'
import { Grid } from '@mui/material'
import OrganizationHeader from 'src/views/pages/organization/OrganizationHeader'
import SentimentPieChart from 'src/views/pages/organization/SentimentPieChart'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import EntityTreeMapChart from 'src/views/pages/organization/EntityTreeMap'
import SentimentTrendChart from 'src/views/pages/organization/SentimentTrendChart'
import WordcloudCard from 'src/views/pages/organization/Wordcloud'





const OrganizationPage = (
    {data}:{data:Organization}
) => {

    
  

  return (
    <ApexChartWrapper>
    <Grid container spacing={6}>
        <Grid item xs={12}  >
            <OrganizationHeader data={data} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'}>
                <EntityTreeMapChart id={data._id} />
                </Grid>
            <Grid item xs={12} md={6} display={'flex'} >
                <SentimentPieChart data={data} />
                </Grid>
                <Grid item xs={12} >
                    <SentimentTrendChart id={data._id} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <WordcloudCard id={data._id} sentiment='pos' />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <WordcloudCard id={data._id} sentiment='neg' />
                                            </Grid>
        

        </Grid>
        </ApexChartWrapper>
  )
}

export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    
    try {

        const data : Organization = await DashboardService.getByID(id)
        
        return {
            props: {
                data
            },
        }

    }catch(err:any){
        //if forbidden redirect to 404
        console.log('err',err);
        
        if(err.response.status === 403){
            return {
                redirect: {
                    destination: '/404',
                    permanent: false,
                },
            }
        }else{
            return {
                redirect: {
                    destination: '/500',
                    permanent: false,
                },
            }
        }
    }
}


export default OrganizationPage
