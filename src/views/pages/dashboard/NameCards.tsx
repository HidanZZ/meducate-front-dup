import { Card,Box, CardContent, Typography,Grid, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { SearchName } from "src/types/apps/dashboard";
import SentimentProgress from "./SentimentProgress";
import Icon from 'src/@core/components/icon'
import { useTheme } from "@emotion/react";

function getShortName(name : string, maxLength  = 15) {
    if (name.length <= maxLength) {
      return name;
    }
  
    return `${name.substring(0, maxLength)}...`;
  }
  


const NameCards = ({ names }:{names:Array<SearchName>}) => {

  return (
    <Grid container spacing={6}>
      {names.map(({ _id, name, positiveCount,negativeCount }) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={_id}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{ height: '100%' , cursor: 'pointer' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
              <Box display="flex" height="100%">
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor:'#8b75b2  '
              ,flexGrow:1 }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Tooltip title = {name} placement="top">
        <Typography
          variant='h6'
          sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
        >
          <Icon icon='mdi:domain' />
          {getShortName(name)}
        </Typography>
        </Tooltip>
        <Typography variant='body2' sx={{ mb: 3, color: 'common.white' }}>
          With the Internet spreading like wildfire and reaching every part of our daily life, more and more traffic is
          directed.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
              <Icon icon='mdi:thumb-up' />
              <Typography variant='body2' sx={{ color: 'common.white' }}>
                {positiveCount}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.25 } }}>
              <Icon icon='mdi:thumb-down' />
              <Typography variant='body2' sx={{ color: 'common.white' }}>
                {negativeCount}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default NameCards;