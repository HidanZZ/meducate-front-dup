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

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))

const VerifyEmail = () => {
  const { email } = useSelector((state: any) => state.verification)
  const router = useRouter()
  useEffect(() => {
    if (!email || email === '') {
      router.push('/404')
    }
  }, [email, router])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src='/images/logo-meducate.png' alt='logo' height={256} width={256} />
          </Box>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Verify your email ✉️
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Account activation link sent to your email address: <strong>{email}</strong> Please follow the link inside
              to continue.
            </Typography>
          </Box>
          <Button fullWidth variant='contained'>
            Skip for now
          </Button>
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>Didn't get the mail?</Typography>
            <LinkStyled href='/' onClick={e => e.preventDefault()}>
              Resend
            </LinkStyled>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default VerifyEmail
