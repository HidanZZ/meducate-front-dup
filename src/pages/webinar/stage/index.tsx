import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import ReactPlayer from 'react-player'
import Avatar from '@mui/material/Avatar'

const Stage = () => {

    const video = {
        link : 'https://www.youtube.com/watch?v=RK1RRVR9A2g',
        title : 'Beauty of nature',
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl. Sed euismod, diam id aliquam ultrices, nunc nisl ultrices nunc, nec ultricies nisl nisl nec nisl.',
        author : 'John Doe',
        date : '2021-10-10',
    }


  return (
    <Box sx={{  flexDirection: 'column'}}>
                <Typography variant='h3' sx={{ whiteSpace: 'nowrap', color: 'text.primary', textAlign: 'center', m:6 }}>
                    {video.title}
                </Typography>
        <Card sx={{ position: 'relative', margin: '0 auto', padding: '0 10', width: '70%', my:10  }}>
            <CardMedia sx={{ aspectRatio: '16/9' }}>
                <ReactPlayer url={video.link} width="100%" height="100%" />
            </CardMedia>
        </Card>
            <Box sx={{ gap: 2, m:8.75, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'  }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                > 
                    <Avatar
                    alt='Robert Meyer'
                    src='/images/avatars/1.png'
                    sx={{
                        width: 50,
                        height: 50,
                        border: theme => `0.25rem solid ${theme.palette.common.white}`
                    }}    
                    />
                    <Typography variant='h6' sx={{ whiteSpace: 'nowrap', color: 'text.primary',margin:5 }}>
                    {video.author}
                </Typography>
                </Box> 
                
                <Typography variant='body1' sx={{ whiteSpace: 'wrap', color: 'text.primary' }}>
                    {video.description}
                </Typography>
            </Box>
        
            
        
    </Box>

  )
}

export default Stage
