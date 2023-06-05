import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { parseISO } from 'date-fns';
import ReducedEventCard from 'src/views/pages/webinar/cards/ReducedEventCard';
import axios from 'axios';

const WebinarList = () => {
    const [webinars, setWebinars] = useState([]);

    async function fetchData() {
        try {
          const response = await axios.get('http://localhost:8000/webinar/getAll');
          const webinarsData = response.data.data.webinars;
          setWebinars(webinarsData);
        } catch (error) {
          console.error(error);
        }
    }
      
  
    
    useEffect(() => {   
        fetchData();
    });
    

    const sortedWebinars = webinars.sort((a, b) => {
        const dateA = parseISO(`${a.date}T${a.start_time}`).getTime();
        const dateB = parseISO(`${b.date}T${b.start_time}`).getTime();
      
        return dateA - dateB;
      });
        
    return (
        <Grid container spacing={5} sx={{ display: 'flex', flexWrap: 'wrap', justifyItems: 'center' }}>
        {sortedWebinars.map((webinar) => (
          <Grid key={webinar._id} item xs={12} sm={6} md={4} lg={4} xl={3} sx={{ justifyContent: 'center', maxWidth: '240px', flex: '1 0 auto' }}>
            <ReducedEventCard webinar={webinar} />
          </Grid>
        ))}
      </Grid>
      
    );
};
    


export default WebinarList;
