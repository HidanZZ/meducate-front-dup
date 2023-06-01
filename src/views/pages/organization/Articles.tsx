// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import ArticleCard from './ArticleCard'
import { Article } from 'src/types/apps/dashboard'


const Articles = (
    {data,handlePageIncrement} : {data:Array<Article>,handlePageIncrement:any}
) => {
  return (
    <Grid container spacing={6} mt={2}>
      <PageHeader
        title={<Typography variant='h5'>Article List</Typography>}
       
      />
      <Grid item xs={12} sx={{ mb: 4 }}>
        <Grid container spacing={6}>
        {
            data.map((article,index) => (
                <Grid item xs={12} key={index}>
                <ArticleCard  
                data={article}
                isLast={index === data.length - 1}
                newLimit={handlePageIncrement}
                
                />
                </Grid>
            ))
        }
        </Grid>
      </Grid>
    
     
    </Grid>
  )
}

export default Articles
