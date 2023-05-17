// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router'
import Lottie from 'lottie-react'
import apiClient from 'src/axios/client'
import succesAnimation from 'src/animations/69013-successful-check.json'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))



const VerifyEmail = (
    {data}:any
) => {
  const router = useRouter()
  useEffect(() => {
    //check if data is null or data has no accessToken or data.accessToken is empty
    
    if (!data || !data.accessToken || data.accessToken === '') {
        router.push('/404')
    }else{
        setTimeout(() => {
            router.push('/login')
        }, 5000);
    }
    
   
  }, [
    data,router
  ])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lottie animationData={succesAnimation} loop={false} />
          </Box>
          <Box sx={{ mb: 8 }} display={'flex'}
    flexDirection={'column'}
    alignItems={'center'}
    justifyContent={'center'}
          >
            <Typography variant='h6' sx={{ mb: 2 }}>
              Your email has been verified
            </Typography>
            
          </Box>
          
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>
             You will be redirected to the login page in 5 seconds
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export const getServerSideProps = async ({ params }: { params: { token: string } }) => {
    const { token } = params
    try {
        const {data} = await apiClient.get(`/user/verification/${token}`)

        return {
            props: {
                data
            },
        }

    }catch(err:any){
        //if forbidden redirect to 404
        if(err.response.status === 403){
            return {
                redirect: {
                    destination: '/404',
                    permanent: false,
                },
            }
        }else{
            return {
                redirect: {
                    destination: '/500',
                    permanent: false,
                },
            }
        }
    }
}

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default VerifyEmail
