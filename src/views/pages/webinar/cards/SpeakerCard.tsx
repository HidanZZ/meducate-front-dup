import { useState } from 'react'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'

import Icon from 'src/@core/components/icon'

type speaker = {
  speaker: {
    id: number,
    firstName: string,
    lastName: string,
    picture: string,
    company: string,
    jobTitle: string,
    description: string
  }
}

const CardSpeaker = (props: speaker) => {
  const [show, setShow] = useState(false)

  const speaker = props.speaker;

  return (  
    <Card
      sx={{
        height: '100%',
        maxWidth: '235px',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '0 10',
        cursor: 'pointer'
      }}
    >
      <CardMedia sx={{ height: '14.625rem' }} onClick={() => setShow(true)}>
        {speaker.picture ? (
          <img
            src={speaker.picture}
            alt='image'
            style={{
              height: '100%',
              width: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              margin: '0 auto',
              padding: '0 10',
            }}
          />
        ) : (
          <img
            src='/images/avatars/1.png'
            alt='Logo'
            style={{
              height: '100%',
              width: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              margin: '0 auto',
              padding: '0 10',
            }}
          />
        )}
      </CardMedia>
      <CardContent onClick={() => setShow(true)}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {speaker.firstName} {speaker.lastName}
        </Typography>
        <Typography variant='body2'>{speaker.jobTitle} @ {speaker.company} </Typography>
      </CardContent>



      <Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='lg'
        onClose={() => setShow(false)}
        onBackdropClick={() => {
          setShow(false);
        }}
      >
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => {
              setShow(false);
            }}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box
            sx={{
              mt: 5.75,
              ml: 4,
              mr: 4,
              display: 'flex',
              alignItems: 'center',
              flexDirection: ['column', null, 'row'],
              flexWrap: 'wrap',
            }}
          >
            <CardMedia
              sx={{
                height: '14.625rem',
                display: 'flex',
                m:5
              }}
            >
              {speaker.picture ? (
                <img
                  src={speaker.picture}
                  alt='image'
                  style={{
                    height: '100%',
                    width: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    margin: ' auto',
                    padding: '0 10',
                  }}
                />
              ) : (
                <img
                  src='/images/avatars/1.png'
                  alt='Logo'
                  style={{
                    height: '100%',
                    width: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    margin: '0 auto',
                    padding: '0 10',
                    borderRadius: '25%',
                  }}
                />
              )}
            </CardMedia>
            <Box
              sx={{
                m: 6,
                width: ['100%', '70%', '70%'],
                alignItems: ['center', null, 'flex-start'],
                justifyContent: 'space-between',
                ml: [0, null, 4],
                mt: [4, null, 0],
              }}
            >
              <Typography variant='h2' sx={{ mb: 0 }}>
                {speaker.firstName} {speaker.lastName}
              </Typography>
              <Typography variant='h6' sx={{ ml: 0 }}>
                {speaker.jobTitle}@{speaker.company}
              </Typography>
              <Typography variant='h4' sx={{ mt: 5, mb: 5, ml: 0 }}>
                Bio
              </Typography>
              <Typography variant='body1' sx={{ ml: 0 }}>
                {speaker.description}
              </Typography>
            </Box>
          </Box>
         
        </DialogContent>
      </Dialog>

    </Card>
  );
};

export default CardSpeaker;
