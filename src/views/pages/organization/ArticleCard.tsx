// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { CardHeader, Chip } from '@mui/material'
import { Article } from 'src/types/apps/dashboard'
import { useRouter } from 'next/router'

const ArticleCard = ({ data ,isLast,newLimit}: { data: Article,isLast:boolean, newLimit:()=>void }) => {
  // ** State
  const [collapse, setCollapse] = useState<boolean>(false)
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setCollapse(!collapse)
  }
  const handleExternalLink = () => {
    window.open(data.link, '_blank')
  }
  useEffect(() => {
  if (!cardRef?.current) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (isLast && entry.isIntersecting) {
      newLimit();
      observer.unobserve(entry.target);
    }
  });

  observer.observe(cardRef.current);
}, [isLast]);

  //helper function to convert this date format 31/05/2023-14:22 to Wed, 31 May 2023 14:22
  const convertDate = (date: string) => {
    const dateArray = date.split('-')
    const datePart = dateArray[0].split('/')
    const timePart = dateArray[1].split(':')
    const newDate = new Date(
      parseInt(datePart[2]),
      parseInt(datePart[1]) - 1,
      parseInt(datePart[0]),
      parseInt(timePart[0]),
      parseInt(timePart[1])
    )
    const time = newDate.toUTCString()

    const timeArray = time.split(':')
    const timeString = `${timeArray[0]}:${timeArray[1]}`

    return timeString
  }
  const floatToPercent = (num: number) => {
    return (num * 100).toFixed(2)
  }

  const handleNameClick = (name: string) => {
    router.push(`/organization/${name}`)
  }

  return (
    <Card 
    ref={cardRef}
    >
      <CardHeader
        title={<Typography variant='h6'>{data.title}</Typography>}
        action={
          <>
            <Typography variant='caption' sx={{ mb: 2, mr: 2 }}>
              {convertDate(data.datetime)}
            </Typography>
            <IconButton size='small' onClick={handleExternalLink}>
              <Icon fontSize='1.875rem' icon={'mdi:open-in-new'} />
            </IconButton>
          </>
        }
      />
      <CardActions className='card-action-dense'>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button onClick={handleClick}>Details</Button>
          <IconButton size='small' onClick={handleClick}>
            <Icon fontSize='1.875rem' icon={collapse ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
          </IconButton>
        </Box>
      </CardActions>
      <Collapse in={collapse}>
        {data.paragraphs.map((paragraph) => (
          <>
            <Divider sx={{ m: '0 !important' }} />
            <CardContent>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon
                  icon={paragraph.sentiment.label === 'POSITIVE' ? 'mdi:thumb-up' : 'mdi:thumb-down'}
                  color={paragraph.sentiment.label === 'POSITIVE' ? 'green' : 'red'}
                />{' '}
                <Typography variant='caption' sx={{ mx: 2 }}>
                  Avec {floatToPercent(paragraph.sentiment.score)}% Precision
                </Typography>
              </Box>

              <Typography
                variant='body2'
                sx={{
                  my: 2
                }}
              >
                {paragraph.text}
              </Typography>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                {paragraph.names.map((name, index) => (
                  <Chip
                    key={index}
                    label={name}
                    sx={{ m: 1, cursor: 'pointer' }}
                    variant='outlined'
                    onClick={() => {
                      handleNameClick(name)
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </>
        ))}
      </Collapse>
    </Card>
  )
}

export default ArticleCard
