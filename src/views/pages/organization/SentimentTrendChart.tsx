// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {  SentimentTrendId } from 'src/types/apps/dashboard'
import { AppDispatch } from 'src/store'
import SimpleSpinner from 'src/@core/components/spinner/Spinner'
import { getTrend } from 'src/store/apps/organization/components/SentimentTrend'

const areaColors = {
  series1: '#ab7efd',
  series2: '#b992fe',
  series3: '#e0cffe'
}
type Series = {
    name: string
    data : number[]
}
type SentimentTrendChartProps = {
    id:string
}

const SentimentTrendChart = ({id}:SentimentTrendChartProps) => {
  // ** Hook
  const theme = useTheme()
  const [options, setOptions] = useState({})
  const [data, setData] = useState<Series[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const {  status } = useSelector((state: any) => state.organization.sentimentTrend)
  const [key, setKey] = useState<number>(0)

  const getData = (id:string ) => {
    dispatch(getTrend(id))
      .unwrap()
      .then((res:SentimentTrendId ) => {
        const category =  res.categories
        const data =  res.series
        setData(data)

        setOptions({
          ...defaultOptions,
          xaxis: {
            ...defaultOptions.xaxis,
            categories: category
          }
        })

        setKey(key + 1)
      })
      .catch(err => {
        console.log(err)
      })
  }
 

  useEffect(() => {
    getData(id)
  }, [id])
  

  const defaultOptions: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      curve: 'straight'
    },
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
    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      show: true,
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
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: [
        
      ]
    }
  }

  return (
    <Card>
      <CardHeader
       
        subheader={``}
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
       
      />
      <CardContent sx={{ pt: `${theme.spacing(3)} !important` }}>
        <Box
          sx={{
            pb: 6
          }}
        >
          {status === 'loading' ? (
            <SimpleSpinner sx={{ height: 500 }}></SimpleSpinner>
          ) : (
            <ReactApexcharts
              key={key}
              type='area'
              height={500}
              options={options}
              series={data}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default SentimentTrendChart
