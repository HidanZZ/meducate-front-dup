import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'


type Webinar = {
    id: number;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    speaker: {
      id: number;
      firstName: string;
      lastName: string;
      picture: string;
      company: string;
      jobTitle: string;
      description: string;
    };
  };
  
  type ReducedEventCardProps = {
    webinar: Webinar;
  };

const ReducedEventCard = ({webinar}:ReducedEventCardProps) => {
      
    
  return (
<Card
  sx={{
    maxWidth: '235px',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10',
    cursor: 'pointer'
  }}
>
  <Typography variant='h6' ml={3} mt={1} fontSize={14}>
    {webinar.title}
  </Typography>
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 auto',
    }}
  >
    <CardMedia sx={{m:2, mt:0}}>
      {webinar.speaker.picture ? (
        <Avatar
          alt='Robert Meyer'
          src={webinar.speaker.picture}
          sx={{
            width: 25,
            height: 25,
            border: theme => `0.25rem solid ${theme.palette.common.white}`,
          }}
        />
      ) : (
        <Avatar
          alt='Robert Meyer'
          src='/images/avatars/1.png'
          sx={{
            width: 40,
            height: 40,
            border: theme => `0.25rem solid ${theme.palette.common.white}`,
          }}
        />
      )}
    </CardMedia>
    <Box sx={{ display: 'flex', flexDirection: 'column', ml:4  }}>
      <Typography variant='body1' sx={{ m: 0, fontSize: 14 }}>
        {webinar.speaker.firstName} {webinar.speaker.lastName}
      </Typography>
      <Typography variant='caption' sx={{ m: 0, fontSize: 12 }}>
        {webinar.speaker.jobTitle}
      </Typography>
    </Box>
  </Box>
</Card>




  )
}

export default ReducedEventCard
