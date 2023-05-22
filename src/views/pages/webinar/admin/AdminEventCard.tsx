import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { parseISO, format } from 'date-fns';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Icon from 'src/@core/components/icon'



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
    handleDelete: (webinarId: number) => void;
  };

const ReducedEventCard = ({webinar, handleDelete}:ReducedEventCardProps) => {

    const onDeleteClick = () => {
        handleDelete(webinar.id);
    };
    
    return (
        <Card
        sx={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 10',
        cursor: 'pointer',
        maxWidth: '22rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        }}
    >
        <Box>
        <CardMedia sx={{ height: '12.625rem' }}>
            <img
            src='/images/icons/LOGO-M-V2.png'
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
        </CardMedia>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml={3}
            mr={2}
            mt={1}
            mb={3}
            flexDirection="row"
            flexWrap="wrap"
        >
            <Typography variant='h6' fontSize={14} sx={{ minWidth: 0, flexBasis: '100%' }}>
            {webinar.title}
            </Typography>
        </Box>
        </Box>
        <Box display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml={3}
            mr={2}
            mt={1}
            mb={3}
            flexDirection="row"
            flexWrap="wrap"
            marginTop='auto'>
        <Typography variant="subtitle1" mr={3} width={100}>
            {getDayOfWeek(webinar.date)} {webinar.date}
        </Typography>
        <Typography variant="subtitle1" mr={3} width={100}>
            {webinar.start_time} - {webinar.end_time}
        </Typography>
    
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-end',
            mb: 2,
            }}
        >
            <CardMedia sx={{ m: 2, mt: 0 }}>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
            <Typography variant='body1' sx={{ m: 0 }}>
                {webinar.speaker.firstName} {webinar.speaker.lastName}
            </Typography>
            <Typography variant='caption' sx={{ m: 0 }}>
                {webinar.speaker.jobTitle}
            </Typography>
            </Box>
        </Box>
        </Box>
        <CardActions sx={{  padding: 0, margin: 0, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant="contained" color="primary" sx={{ flex: 1, borderRadius: '0px 0px 0px 4px' }} onClick={onDeleteClick}>
                <Icon icon='mdi:trash' fontSize="medium" /> Delete
            </Button>
            <Button variant="contained" color="secondary" sx={{ flex: 1, borderRadius: '0px 0px 0px 4px' }}>
                <Icon icon='mdi:edit' fontSize="medium"/>  Edit
            </Button>
        </Box>
        </CardActions>
        </Card>
    




    )
};


function getDayOfWeek(dateString: string) {
  const date = parseISO(dateString);
  const dayOfWeek = format(date, 'EEEE');

  return dayOfWeek;
  
}

export default ReducedEventCard
