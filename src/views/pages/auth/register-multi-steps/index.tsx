// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

// ** Step Components
import StepPersonalDetails from 'src/views/pages/auth/register-multi-steps/StepPersonalInfo'
import StepProfessionalInfo from 'src/views/pages/auth/register-multi-steps/StepProfessionalInfo'

// ** Custom Component Import
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useSelector } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const steps = [
  {
    title: 'Personal',
    subtitle: 'Enter Your Information'
  },
  {
    title: 'Professional',
    subtitle: 'Enter Your Information'
  }
]

const RegisterMultiSteps = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)
  const {status,error} = useSelector((state: any) => state.register)
  const router =useRouter()

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handlePrev = () => {
    console.log('activeStep', activeStep);
    
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StepPersonalDetails handleNext={handleNext} />
    
      case 1:
        return <StepProfessionalInfo handlePrev={handlePrev} />

      default:
        return null
    }
  }
  useEffect(() => {
    switch (status) {
      case 'success':
        router.push('/login')
        break;
      case 'error':
        toast.error(error.message)
        break;
    }
      
  }, [status,error,router])

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  return (
    <>
    {
      status ==='loading' ? (
          <FallbackSpinner sx={{
            height: '100%',
          }}/>
        
      ):(
        <>
      <StepperWrapper sx={{ mb: 10 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <Typography className='step-number'>{`0${index + 1}`}</Typography>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      {renderContent()}
    </>
      )
    }
    </>
    
  )
}

export default RegisterMultiSteps
