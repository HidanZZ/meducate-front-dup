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
import DatePickerRange from 'src/views/forms/dashboard/DatePicker'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { DateRange, SentimentTrend, lastYearDateRange } from 'src/types/apps/dashboard'
import { AppDispatch } from 'src/store'
import SimpleSpinner from 'src/@core/components/spinner/Spinner'
import { Typography } from '@mui/material'
import { getTrend } from 'src/store/apps/dashboard/components/getSentimentTrendOverTime'

const areaColors = {
  series1: '#ab7efd',
  series2: '#b992fe',
  series3: '#e0cffe'
}
type Series = {
    name: string
    data : number[]
}

const SentimentTrendChart = () => {
  // ** Hook
  const theme = useTheme()
  const [options, setOptions] = useState({})
  const [data, setData] = useState<Series[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const {  status } = useSelector((state: any) => state.dashboard.getSentimentTrendOverTime)
  const [key, setKey] = useState<number>(0)

  const getData = (daterange: DateRange) => {
    dispatch(getTrend(daterange))
      .unwrap()
      .then((res: Array<SentimentTrend>) => {
        const category = getCategory(res)
        const series = getSeries(res)
        setOptions({
          ...defaultOptions,
          xaxis: {
            ...defaultOptions.xaxis,
            categories: category
          }
        })

        setData(series)
        setKey(key + 1)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getCategory = (data: Array<SentimentTrend>) => {
    const category = data.map((item: SentimentTrend) => {
      const date = new Date(item.date.$date)
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()

        return `${month}/${year}`
    })

    return category
  }

  const getSeries = (data: Array<SentimentTrend>) => {
    const series = [
      {
        name: 'Positive',
        data: data.map((item: SentimentTrend) => {
            console.log(item);
            
          return item.sentiments.filter((item: any) => item.sentiment === 'POSITIVE')[0].count
        })
      },
      {
        name: 'Negative',
        data: data.map((item: SentimentTrend) => {
          return item.sentiments.filter((item: any) => item.sentiment === 'NEGATIVE')[0].count
        })
      }
    ]

    return series
  }

  useEffect(() => {
    getData(lastYearDateRange)
  }, [])
  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (!end && !start) {
      getData(lastYearDateRange)

      return
    }
    console.log(start, end)

    const startDate = new Date(start)
    const endDate = new Date(end)

    const dateRange: DateRange = {
      startMonth: startDate.getMonth() + 1,
      startYear: startDate.getFullYear(),
      endMonth: endDate.getMonth() + 1,
      endYear: endDate.getFullYear()
    }

    if (end) {
      getData(dateRange)
    }
  }

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
        title={
          <Typography
            variant='h5'
            sx={{
              userSelect: 'none'
            }}
          >
            Sentiment Trend Over Time
          </Typography>
        }
        subheader={``}
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={<DatePickerRange onDateSelected={handleOnChangeRange} popperPlacement='bottom-end' />}
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
