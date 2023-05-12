// ** MUI Imports

import Grid from '@mui/material/Grid'
import { ReactNode, useEffect } from 'react'
import { Avatar, Badge, Box, useTheme } from '@mui/material'
import { motion, useAnimation } from 'framer-motion'
import Card from 'src/views/pages/home/Card'
import { useRouter } from 'next/router'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Home = () => {
  const controls = useAnimation()
  const theme = useTheme()
  const router = useRouter()
  const getRandomColor = () => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main
    ]

    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    controls.start('visible')
  }, [])

  const cardsData = [
    { index: 0, title: '', link: '', height: '35%', logo: true },
    { index: 1, title: 'Knowledge HUB', link: '/second-page' },
    { index: 2, title: 'Brand & Marketing Central', link: '/second-page' },
    { index: 3, title: 'Human Resources System', link: '/second-page', height: '50%' },
    { index: 4, title: 'Events Calendar', link: '/second-page' },
    { index: 5, title: 'Learning & Development Community', link: '/second-page', height: '50%' },
    { index: 6, title: 'Global News', link: '/second-page', height: '30%' },
    { index: 7, title: 'People Directory', link: '/second-page' }
  ]
  const handleRedirect = () => {
    router.push('/second-page')
  }

  const renderCards = () => {
    return cardsData.map((card, index) => {
      if (index % 2 === 0) {
        return (
          <Grid
            item
            xs={6}
            md={6}
            lg={3}
            display={'flex'}
            flexDirection={'column'}
            key={index}
            minHeight={{ xs: '600px', lg: '200px' }}
          >
            <Card {...card} bgColor={getRandomColor()} />
            {cardsData[index + 1] && <Card {...cardsData[index + 1]} bgColor={getRandomColor()} />}
          </Grid>
        )
      } else {
        return null
      }
    })
  }

  return (
    <Box
      py={16}
      px={{ xs: 6, md: 16, lg: 32 }}
      sx={{
        height: '100vh',
      }}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box
        width={'100%'}
        py={4}
        display='flex'
        justifyContent='flex-end'
        alignItems='flex-end'
        sx={{
          maxHeight: '80px'
        }}
        component={motion.div}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Badge
        overlap='circular'
        onClick={handleRedirect}
        sx={{ ml: 2, cursor: 'pointer' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleRedirect}
          sx={{ width: 64, height: 64 }}
          src='/images/avatars/user.png'
        />
      </Badge>
      </Box>

      <Grid
        sx={{
          flex: 1
        }}
        container
        spacing={6}
        component={motion.div}
        initial='hidden'
        animate={controls}
        variants={{}}
      >
        {renderCards()}
      </Grid>
    </Box>
  )
}

Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Home
