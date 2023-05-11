import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import ReactPlayer from 'react-player'

const Stage = () => {

    const video = {
        link : 'https://www.youtube.com/watch?v=RK1RRVR9A2g',
        title : 'Webinar 1',
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl.',
        author : 'John Doe',
        date : '2021-10-10',
    }


  return (
    <Box sx={{  flexDirection: 'column'}}>
        <Card sx={{ position: 'relative', alignItems: 'center', justifyContent: 'center', margin: 5, padding: '0 10' }}>
            <CardMedia sx={{ aspectRatio: '16/9' }}>
                <ReactPlayer url={video.link} width="100%" height="100%" />
            </CardMedia>
        </Card>
        <Card sx={{ position: 'relative', alignItems : 'center', justifyContent : 'center', margin : 5, padding : '0 10' }}>
            <Box sx={{ gap: 2, m:8.75, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'  }}>
                <Typography variant='h5' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
                    {video.title}
                </Typography>
                <Typography variant='h6' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
                    {video.author}
                </Typography>
                <Typography variant='body1' sx={{ whiteSpace: 'wrap', color: 'text.primary' }}>
                    {video.description}
                </Typography>
            </Box>
        </Card>
    </Box>

  )
}

export default Stage
