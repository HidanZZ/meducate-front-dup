// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import Image from 'next/image'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import useCountdown from 'src/hooks/useCountdown'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { resendVerificationEmail } from 'src/store/apps/verification'
import { toast } from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress';

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

// const LinkStyled = styled('a')(({ theme }) => ({
//   textDecoration: 'none',
//   marginLeft: theme.spacing(1),
//   color: theme.palette.primary.main
// }))

const VerifyEmail = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const {remainingSeconds,start,reset} = useCountdown(60)
  const {status,error,email} = useSelector((state:any) => state.verification)

  useEffect(() => {
    if (!email || email === '') {
      router.push('/404')
    }
  }, [email, router])

   useEffect(() => {
    start(); // Start the countdown when the component mounts
  }, [start]);

  const resend   = () => {
    dispatch(resendVerificationEmail(email)).unwrap().then(() => {
      reset()
      start()
    }).catch((err) => {
      toast.error(err.message)
    })
  }
  useEffect(() => {
    if (status === 'success') {
      toast.success('Email sent successfully')
    }else if(status === 'error'){
      toast.error(error)
    }
  }, [status,error])

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  // Format the minutes and seconds correctly
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;


  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src='/images/logo-meducate.png' alt='logo' height={256} width={256} />
          </Box>
          <Box sx={{ mb: 8 }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            >
            <Typography variant='h5' sx={{ mb: 2 }}>
              Verify your email ✉️
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Account activation link sent to your email address: <strong>{email}</strong> Please follow the link inside
              to continue.
            </Typography>
          </Box>
         
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>Didn't get the mail?</Typography>
            <Button sx={{
              marginLeft: 5,
              
            }} variant='contained'
              onClick={resend}
              disabled={remainingSeconds > 0 || status === 'loading'}
            >
            
              {status === 'loading' ? (
    <CircularProgress color="inherit" size={24} />
  ) : (
    remainingSeconds > 0 ? `Resend in ${formattedMinutes}:${formattedSeconds}` : 'Resend'
  )}
            
          </Button>
          
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default VerifyEmail
