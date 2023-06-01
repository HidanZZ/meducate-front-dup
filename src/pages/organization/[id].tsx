import DashboardService from 'src/services/dashboard'
import { Organization } from 'src/types/apps/dashboard'
import { Grid } from '@mui/material'
import OrganizationHeader from 'src/views/pages/organization/OrganizationHeader'
import SentimentPieChart from 'src/views/pages/organization/SentimentPieChart'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import EntityTreeMapChart from 'src/views/pages/organization/EntityTreeMap'
import SentimentTrendChart from 'src/views/pages/organization/SentimentTrendChart'
import WordcloudCard from 'src/views/pages/organization/Wordcloud'
import Articles from 'src/views/pages/organization/Articles'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { useEffect, useState } from 'react'
import { fetcharticles } from 'src/store/apps/organization/components/ArticlesById'
import { useSelector } from 'react-redux'
import SimpleSpinner from 'src/@core/components/spinner/Spinner'

const OrganizationPage = ({ data }: { data: Organization }) => {
  const [page, setPage] = useState<number>(1)

  const dispatch = useDispatch<AppDispatch>()

  const { status, articles } = useSelector((state: any) => state.organization.ArticlesById)

  useEffect(() => {
    console.log('page', page)
    getData(data._id, page)
  }, [page])

  const getData = (id: string, page: number) => {
    dispatch(fetcharticles({ id, page }))
  }

  const handlePageIncrement = () => {
    setPage(prev => prev + 1)
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <OrganizationHeader data={data} />
        </Grid>
        <Grid item xs={12} md={6} display={'flex'}>
          <EntityTreeMapChart id={data._id} />
        </Grid>
        <Grid item xs={12} md={6} display={'flex'}>
          <SentimentPieChart data={data} />
        </Grid>
        <Grid item xs={12}>
          <SentimentTrendChart id={data._id} />
        </Grid>
        <Grid item xs={12} md={6}>
          <WordcloudCard id={data._id} sentiment='pos' />
        </Grid>
        <Grid item xs={12} md={6}>
          <WordcloudCard id={data._id} sentiment='neg' />
        </Grid>
        <Grid item xs={12}>
          <Articles data={articles} handlePageIncrement={handlePageIncrement} count={data.articlesCount} />
        </Grid>
        <Grid item xs={12}>
          {status === 'loading' && <SimpleSpinner />}
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  try {
    const data: Organization = await DashboardService.getByID(id)

    return {
      props: {
        data
      }
    }
  } catch (err: any) {
    //if forbidden redirect to 404
    console.log('err', err)

    if (err.response.status === 403) {
      return {
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    } else {
      return {
        redirect: {
          destination: '/500',
          permanent: false
        }
      }
    }
  }
}

export default OrganizationPage
