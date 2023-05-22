import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'


import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { Box, Typography } from '@mui/material'

const defaultValues = {
  question: '',
  questionCount:'',
}

interface WebinarFormProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

const WebinarForm: React.FC<WebinarFormProps> = ({ open, onClose }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const addQuestion = () => {
    if (questions.length === 3) {
      setShowError(true);
      
      return;
    }
    setQuestions(prevQuestions => [...prevQuestions, '']);
  };

  const removeQuestion = (index: number): void => {
    setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== index));
  };
  
  const onSubmit = () => alert('Form Submitted');

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth>
      <DialogTitle>Webinar Confirmation</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IconButton
            size='small'
            onClick={() => {
              onClose(false);
            }}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <p>Are you sure you want to join the webinar?</p>
          <FormControl fullWidth>
            <Controller
              name='question'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  multiline
                  minRows={3}
                  placeholder='Question...'
                  error={Boolean(errors.question)}
                  aria-describedby='validation-question'
                  sx={{
                    '& .MuiOutlinedInput-root': { alignItems: 'baseline' },
                    mb: 5
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon icon='mdi:message-outline'  />
                      </InputAdornment>
                    )
                  }}
            />
              )}
            />
            {errors.question && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-question'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
  
          {questions.map((question, index) => (
          
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>   
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder='Question...'
                sx={{
                  '& .MuiOutlinedInput-root': { alignItems: 'baseline' },
                  mb: 5
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:message-outline' />
                    </InputAdornment>
                  )
                }}
              />
              <IconButton size='small' onClick={() => removeQuestion(index)}>
                <Icon icon='mdi:trash' />
              </IconButton>
            </Box>

          ))}
          {showError && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: 'error.main' }} >
                  you can have 3 question max
                </Typography>
              </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <Button variant='contained' onClick={addQuestion}>
              <Icon icon='mdi:plus' />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', mt: 2 }}>

            <Button variant='contained' color='primary' type='submit'>
              Submit
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}  

export default WebinarForm;
