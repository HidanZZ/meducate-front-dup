import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#b22222',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#539165',
  },
}));


export default function SentimentProgress({value}:{value:number}) {
    return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <ThumbUpIcon
        sx={{
            color: '#539165',
            width: 20,
            height: 20,
        }}
        />
        <Box
            sx={{
                flexGrow: 1,
                margin: '0 8px',
            }}
        >
        <BorderLinearProgress variant="determinate" value={value} />

        </Box>
        <ThumbDownIcon
        sx={{
            color: '#b22222',
            width: 20,
            height: 20,
        }}
        />
      </Box>
    );
  }