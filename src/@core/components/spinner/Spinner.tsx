// ** MUI Import

import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const SimpleSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
 

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      
      <CircularProgress disableShrink  />
    </Box>
  )
}

export default SimpleSpinner
