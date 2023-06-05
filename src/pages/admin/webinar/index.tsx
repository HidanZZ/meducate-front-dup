import { Button, Grid } from '@mui/material';
import { parseISO } from 'date-fns';
import AdminEventCard from 'src/views/pages/webinar/admin/AdminEventCard';
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react';
import Icon from 'src/@core/components/icon'
import NewEventForm from 'src/views/pages/webinar/admin/NewEventForm'
import EditEvent from 'src/views/pages/webinar/admin/EditEvent'
import axios from 'axios';


interface Speaker {
    firstName: string;
    lastName: string;
    picture: string;
    company: string;
    jobTitle: string;
    description: string;
  }
  
  interface WebinarData {
    speaker: Speaker;
    _id: string;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    createdAt: string;
    updatedAt: string;
  }
  

type FormData = {
    title: string;
    date: Date | null;
    startTime: string;
    endTime: string;
    webinarDescription: string;
    lastName: string;
    firstName: string;
    company: string;
    jobTitle: string;
    speakerDescription: string;
    gender: string;
    select: string;
    checkbox: boolean;
};
  

const WebinarList = () => {
    const [addDialogOpen,setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [webinarToEdit, setWebinarToEdit] = useState('');
    const [webinars,setWebinars] = useState<WebinarData[]>([ ])
    
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

    const handleEdit = (webinarId: string) => {
        setWebinarToEdit(webinarId);
        setEditDialogOpen(true);
    };

    const addWebinar = (data: FormData) => {
        
    };

    const editWebinar = (data: WebinarData) => {
        const updatedWebinars = webinars.map((webinar) => {
          if (webinar._id === data._id) {
            // Replace the old webinar with the new one
            return {
              ...webinar,
              ...data,
            };
          }

          return webinar;
        });
      
        setWebinars(updatedWebinars);
        setEditDialogOpen(false);
    };
      

    const sortedWebinars = webinars.sort((a, b) => {
        const dateA = parseISO(`${a.date}T${a.start_time}`).getTime();
        const dateB = parseISO(`${b.date}T${b.start_time}`).getTime();
      
        return dateA - dateB;
      });
        
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button variant="contained" color="secondary" onClick={() => setAddDialogOpen(true)} sx={{ width: '50%', maxWidth: '240px', mb: 4 }}>
                <Icon icon='mdi:plus' fontSize="medium" /> New Event
            </Button>
            <Grid container spacing={5} sx={{ display: 'flex', flexWrap: 'wrap', justifyItems: 'center' }}>
                {sortedWebinars.map((webinar) => (
                <Grid key={webinar._id} item xs={12} sm={6} md={4} lg={4} xl={3} sx={{ justifyContent: 'center', maxWidth: '240px', flex: '1 0 auto' }}>
                    
                    <AdminEventCard webinar={webinar} onEdit={() => handleEdit(webinar._id)}  />
                    {webinarToEdit === webinar._id && (
                        <EditEvent
                            webinar={webinar}
                            open={editDialogOpen}
                            onClose={() => setEditDialogOpen(false)}
                            onSubmit={editWebinar}
                        />
                        )}
                </Grid>
                ))}
            </Grid>
            <NewEventForm open={addDialogOpen} onClose={() => setAddDialogOpen(false)} onSubmit={addWebinar} />
        </Box>
        
      
    );
};
    


export default WebinarList;
