// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import Image from 'next/image'



// ** Util Import
import DatePickerRange from 'src/views/forms/dashboard/DatePicker'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { DateRange,allTimeDateRange } from 'src/types/apps/dashboard'
import { AppDispatch } from 'src/store'
import SimpleSpinner from 'src/@core/components/spinner/Spinner'
import { Typography } from '@mui/material'
import { Sentiment } from 'src/types/apps/dashboard'
import { DateRangeWithSentiment } from 'src/types/apps/dashboard'
import { getWordcloud } from 'src/store/apps/dashboard/components/wordcloud'

const WordcloudCard = () => {
  // ** Hook
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const {  status } = useSelector((state: any) => state.dashboard.wordcloud)
  const [key, setKey] = useState<number>(0)
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment>('pos')
  const [wordcloudImage, setWordcloudImage] = useState<string>('')
  const handleSentimentChange = (sentiment: Sentiment) => {
    setSelectedSentiment(sentiment)
    const fields : DateRangeWithSentiment = {
      ...allTimeDateRange,
      sentiment: sentiment
    }
    getData(fields)
  }
  const getData = (fields: DateRangeWithSentiment) => {
    dispatch(getWordcloud(fields))
      .unwrap()
      .then((res: string) => {
        const base64 = `data:image/jpeg;base64,${res}`
        setWordcloudImage(base64)
        setKey(key + 1)
      })
      .catch(err => {
        console.log(err)
      })
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
      getData({
        ...dateRange,
        sentiment: selectedSentiment
      })
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
            pb: 6,
            height: 500,
            position: 'relative'

          }}
        >
          {status === 'loading' ? (
            <SimpleSpinner sx={{ height: 500 }}></SimpleSpinner>
          ) : (
            <Image
            fill
            alt='wordcloud'
            style={{ objectFit: "contain" }}
            src={wordcloudImage} key={key} />
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
      <Box
        onClick={handleOnChange}
        component='span'
        sx={{ color: sentiments[selected].color, fontWeight: 'bold', cursor: 'pointer' }}
      >
        {sentiments[selected].text}
      </Box>{' '}
      Word Cloud
    </Typography>
  )
}

export default WordcloudCard
