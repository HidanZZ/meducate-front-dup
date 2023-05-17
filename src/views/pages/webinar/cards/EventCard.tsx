import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import WebinarForm from '../JoinDialogueForm'

import ReactPlayer from 'react-player'
import Countdown from '../Countdown'

const EventCard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card
    sx={{
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      padding: '0 10',
    }}
  >
    <CardMedia
    sx={{
      aspectRatio: '21/8.88',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  > 
    <Box sx={{width:'100%', height:'100%', filter: 'blur(2px)'}}>
      <ReactPlayer
        url={'https://www.youtube.com/watch?v=wNTrWZ42olc'}
        playing
        loop
        muted
        width="100%"
        height="100%"
        controls={false}
        config={{
          youtube: {
            playerVars: {
              start: 400, // Start playing from 30 seconds
              end: 500, // Play until 60 seconds
              showinfo: 0,
            },
          },
        }}
      />
    </Box>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Countdown />
    </Box>
  </CardMedia>
    

      <Box
        sx={{
          mt: 5.75,
          ml: 4,
          mr: 4,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Avatar
          alt='Robert Meyer'
          src='/images/avatars/1.png'
          sx={{
            width: 75,
            height: 75,
            border: theme => `0.25rem solid ${theme.palette.common.white}`
          }}    
        />
        <Button variant='contained' onClick={() => setDialogOpen(true)}>Join Webinar</Button>
      </Box> 
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>Robert Meyer</Typography>
            <Typography variant='caption'>CEO</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column',wrap:'' }}>
          Proin faucibus volutpat purus, eu bibendum elit tristique gravida. Aenean in ligula eget velit faucibus egestas nec quis sem. Praesent eget finibus quam. Donec luctus semper pulvinar. In sodales egestas magna, at lacinia nisl dapibus sit amet. In aliquam tempor nisi ut ultrices. Vestibulum blandit lectus at mi volutpat, quis volutpat turpis ultricies
          </Box>
          
        </Box>
        <Box sx={{ gap: 2, mb:8.75, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'  }}>
          <Typography variant='h6' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Lorem ipsum
          </Typography>
          <Typography variant='body1' sx={{ whiteSpace: 'wrap', color: 'text.primary' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur volutpat velit. Quisque ut lacinia diam. Maecenas rutrum tortor eget est facilisis eleifend. Aliquam vel dolor eget augue rutrum vulputate quis ut nibh. Aenean blandit justo sem, non scelerisque augue luctus vitae. Duis arcu sapien, commodo ut vulputate eu, viverra a tellus. Integer tincidunt, est at elementum posuere, lorem nibh tincidunt lacus, imperdiet vestibulum purus augue id erat. Fusce vestibulum felis at accumsan maximus. Duis laoreet aliquet ante, vel tincidunt ligula lobortis quis. Vestibulum a diam sed leo vehicula vulputate non vitae urna.
          </Typography>
        </Box>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Participants
          </Typography>
          <AvatarGroup max={4}>
            <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
            <Avatar src='/images/avatars/7.png' alt='Jeffery Warner' />
            <Avatar src='/images/avatars/3.png' alt='Howard Lloyd' />
            <Avatar src='/images/avatars/2.png' alt='Bettie Dunn' />
            <Avatar src='/images/avatars/4.png' alt='Olivia Sparks' />
            <Avatar src='/images/avatars/5.png' alt='Jimmy Hanson' />
            <Avatar src='/images/avatars/6.png' alt='Hallie Richards' />
          </AvatarGroup>
        </Box>
        
      </CardContent>
      <WebinarForm open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Card>

  )
}

export default EventCard
