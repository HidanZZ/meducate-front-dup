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
import { DateRange, TopNames, allTimeDateRange } from 'src/types/apps/dashboard'
import { AppDispatch } from 'src/store'
import SimpleSpinner from 'src/@core/components/spinner/Spinner'
import { Typography } from '@mui/material'
import { Sentiment } from 'src/types/apps/dashboard'
import { DateRangeWithSentiment } from 'src/types/apps/dashboard'
import { fetchTopNamesBySentiment } from 'src/store/apps/dashboard/components/topNamesBySentiment'
import { useRouter } from 'next/router'

const TopNamesBySentimentChart = () => {
  // ** Hook
  const theme = useTheme()
  const [options, setOptions] = useState({})
  const [data, setData] = useState<number[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const { topNames, status } = useSelector((state: any) => state.dashboard.topNamesBySentiment)
  const [key, setKey] = useState<number>(0)
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment>('pos')
  const router = useRouter()
  const handleSentimentChange = (sentiment: Sentiment) => {
    setSelectedSentiment(sentiment)
    const fields : DateRangeWithSentiment = {
      ...allTimeDateRange,
      sentiment: sentiment
    }
    getData(fields)
  }
  const getData = (fields: DateRangeWithSentiment) => {
    dispatch(fetchTopNamesBySentiment(fields))
      .unwrap()
      .then((res: Array<TopNames>) => {
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
        console.log(err);
        
        
      })
  }
  const getCategory = (data: Array<TopNames>) => {
    const category = data.map((item: TopNames) => {
      return item.name
    })

    return category
  }

  const getSeries = (data: Array<TopNames>) => {
    const series = data.map((item: TopNames) => {
      return item.count
    })

    return series
  }

  useEffect(() => {
    const fields : DateRangeWithSentiment = {
      ...allTimeDateRange,
      sentiment: selectedSentiment
    }
    getData(fields)
  }, [])
  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (!end && !start) {
      getData({
        ...allTimeDateRange,
        sentiment: selectedSentiment
      })

      return
    }
    

    const startDate = new Date(start)
    const endDate = new Date(end)

    const dateRange: DateRange = {
      startMonth: startDate.getMonth() + 1,
      startYear: startDate.getFullYear(),
      endMonth: endDate.getMonth() + 1,
      endYear: endDate.getFullYear()
    }

    if (end) {
      getData({
        ...dateRange,
        sentiment: selectedSentiment
      })
    }
  }

  const defaultOptions: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const index = config.dataPointIndex
          const id = topNames[index]._id
          
          router.push(`/organization/${id}`)
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '60%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      borderColor: theme.palette.divider,
      padding: {
        top: -1,
        left: -9,
        right: 0,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [theme.palette.primary.main],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: [],
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetY: 2,
        offsetX: -17,
        style: { colors: theme.palette.text.disabled },
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}k` : value}`
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title={<SentimentTextSwitch selected={selectedSentiment} setSelected={handleSentimentChange} />}
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
            <SimpleSpinner sx={{ height: 300 }}></SimpleSpinner>
          ) : (
            <ReactApexcharts
              key={key}
              type='bar'
              height={300}
              options={options}
              series={[{ name: 'Count', data: data }]}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
type SentimentTextSwitchProps = {
  selected: Sentiment
  setSelected: (sentiment: Sentiment) => void
}

const SentimentTextSwitch = ({ selected, setSelected }:SentimentTextSwitchProps) => {
  type Sentiment = {
    [key: string]: {
      text: string
      color: string
    }
  }
  const sentiments: Sentiment = {
    pos: {
      text: 'Positive',
      color: '#009068'
    },
    neg: {
      text: 'Negative',
      color: '#E81B1B'
    }
  }

  const handleOnChange = () => {
    //toggle selected
    const target = selected === 'pos' ? 'neg' : 'pos'
    setSelected(target)
  }

  return (
    <Typography variant='h5' sx={{
      userSelect: 'none',
    }}>
      Top{' '}
      <Box
        onClick={handleOnChange}
        component='span'
        sx={{ color: sentiments[selected].color, fontWeight: 'bold', cursor: 'pointer' }}
      >
        {sentiments[selected].text}
      </Box>{' '}
      Names
    </Typography>
  )
}

export default TopNamesBySentimentChart