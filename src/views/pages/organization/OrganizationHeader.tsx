

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Organization } from 'src/types/apps/dashboard'


const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))
type OrganizationHeaderProps = {
    data: Organization
}
const OrganizationHeader = ({
    data
}:OrganizationHeaderProps) => {
  


  return data !== null ? (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image={'/images/pages/profile-banner.png'}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <ProfilePicture src='/images/avatars/1.png' alt='profile-picture' />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 4 }}>
              {data.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
             
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:link-variant' />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>
                  {`Mentioned ${data.count} times`}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon icon={
                data.negativeCount > data.positiveCount ? 'mdi:thumb-down' : 'mdi:thumb-up'
            }
            color={
                data.negativeCount > data.positiveCount ? 'red' : 'green'
            }
            fontSize={'2rem'}

            />
            </Box>
        </Box>
      </CardContent>
    </Card>
  ) : null
}

export default OrganizationHeader
