// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import Image from 'next/image'



// ** Util Import
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch } from 'src/store'
import SimpleSpinner from 'src/@core/components/spinner/Spinner'
import { Typography } from '@mui/material'
import { Sentiment } from 'src/types/apps/dashboard'
import { getWordcloud } from 'src/store/apps/organization/components/wordcloud'

type WordcloudCardProps = {
    id: string
    sentiment: Sentiment
}

const WordcloudCard = ({id,sentiment}:WordcloudCardProps) => {
  // ** Hook
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const {  status } = useSelector((state: any) => state.dashboard.wordcloud)
  const [key, setKey] = useState<number>(0)
  const [wordcloudImage, setWordcloudImage] = useState<string>('')
 
  const getData = (id:string,sentiment:string) => {
    dispatch(getWordcloud({id,sentiment}))
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
    getData(id,sentiment)
  }, [id,sentiment])

  const sentiments = {
    pos: 'Positive',
    neg: 'Negative',
  }
  

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h5'>
            {sentiment === 'pos'? sentiments.pos : sentiments.neg} Wordcloud
  
        </Typography>}
        subheader={``}
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent sx={{ pt: `${theme.spacing(3)} !important` }}>
        <Box
          sx={{
            pb: 6,
            height: 300,
            position: 'relative'

          }}
        >
          {status === 'loading' ? (
            <SimpleSpinner sx={{ height: 300 }}></SimpleSpinner>
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

export default WordcloudCard
