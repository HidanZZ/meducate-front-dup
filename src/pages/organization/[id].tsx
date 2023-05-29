
import DashboardService from 'src/services/dashboard'
import { Organization } from 'src/types/apps/dashboard'
import { Grid } from '@mui/material'
import OrganizationHeader from 'src/views/pages/organization/OrganizationHeader'
import SentimentPieChart from 'src/views/pages/organization/SentimentPieChart'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import EntityTreeMapChart from 'src/views/pages/organization/EntityTreeMap'





const OrganizationPage = (
    {data}:{data:Organization}
) => {

    
  

  return (
    <ApexChartWrapper>
    <Grid container spacing={6}>
        <Grid item xs={12} >
            <OrganizationHeader data={data} />
            </Grid>
            <Grid item xs={12} md={6}>
                <EntityTreeMapChart id={data._id} />
                </Grid>
            <Grid item xs={12} md={6} >
                <SentimentPieChart data={data} />
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
