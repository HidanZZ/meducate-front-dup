import { Button, Grid } from '@mui/material';
import { parseISO } from 'date-fns';
import AdminEventCard from 'src/views/pages/webinar/admin/AdminEventCard';
import Box from '@mui/material/Box'
import { useState } from 'react';
import Icon from 'src/@core/components/icon'
import NewEventForm from 'src/views/pages/webinar/admin/NewEventForm'
import EditEvent from 'src/views/pages/webinar/admin/EditEvent'

interface Speaker {
    id: number;
    firstName: string;
    lastName: string;
    picture: string;
    company: string;
    jobTitle: string;
    description: string;
}
  
interface WebinarData {
    id: number;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    speaker: Speaker;
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
    const [webinarToEdit, setWebinarToEdit] = useState(-1);
    const [webinars,setWebinars] = useState<WebinarData[]>([
        {
            id: 1,
            title: 'Data Analytics for Population Health Management',
            date: '2023-07-15',
            start_time: '10:00',
            end_time: '11:00',
            speaker:{
                id: 4,
                firstName: 'David',
                lastName: 'Chen',
                picture: '',
                company: 'Finance Academy',
                jobTitle: 'Investment Strategist',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
            }
        },
        {
            id: 2,
            title: 'Emerging Technologies in Surgery: Robotic-Assisted Procedures',
            date: '2023-08-01',
            start_time: '15:00',
            end_time: '16:00',
            speaker:{
                id: 5,
                firstName: 'Sarah',
                lastName: 'Johnson',
                picture: '',
                company: 'Marketing Minds',
                jobTitle: 'Chief Marketing Officer',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
            }
        },
        {
            id: 3,
            title: 'Cybersecurity in the Age of Digital Health: Protecting Patient Data',
            date: '2023-08-15',
            start_time: '14:00',
            end_time: '15:00',
            speaker:{
                id: 6,
                firstName: 'John',
                lastName: 'Smith',
                picture: '',
                company: 'Data Analytics Inc',
                jobTitle: 'Data Scientist',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',    
            }
        },
        {
            id: 4,
            title: 'Exploring AI in Healthcare: Improving Diagnostics and Treatment',
            date: '2023-08-15',
            start_time: '14:00',
            end_time: '15:00',
            speaker:{
                id: 6,
                firstName: 'John',
                lastName: 'Smith',
                picture: '',
                company: 'Data Analytics Inc',
                jobTitle: 'Data Scientist',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',    
            }
        },
        {
            id: 5,
            title: 'ftiyftkckytftyitdfiytfy gy tgtg  tgtgtgtg§gtgt9',
            date: '2023-08-01',
            start_time: '10:00',
            end_time: '12:00',
            speaker:{
                id: 5,
                firstName: 'Sarah',
                lastName: 'Johnson',
                picture: '',
                company: 'Marketing Minds',
                jobTitle: 'Chief Marketing Officer',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
            }
        },
        {
            id: 6,
            title: 'Advancements in Wearable Technology for Personalized Health Monitoring',
            date: '2023-06-01',
            start_time: '13:00',
            end_time: '14:00',
            speaker:{
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                picture: '',
                company: 'meducate',
                jobTitle: 'CEO',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
            }
        },
        {
            id: 7,
            title: 'The Future of Telemedicine: Revolutionizing Healthcare Delivery',
            date: '2023-06-15',
            start_time: '10:00',
            end_time: '12:00',
            speaker:{
                id: 2,
                firstName: 'Jane',
                lastName: 'Smith',
                picture: '',
                company: 'edTech Solutions',
                jobTitle: 'CTO',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
            }
        },
        {
            id: 8,
            title: 'The Impact of Technology on Mental Health',
            date: '2023-07-01',
            start_time: '11:00',
            end_time: '12:00',
            speaker:{
                id: 3,
                firstName: 'Bob',
                lastName: 'Jones',
                picture: '',
                company: 'edTech Solutions',
                jobTitle: 'CTO',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
            }
        },
        
    ])

    
    const handleDelete = (webinarId: number) => {
        setWebinars((prevWebinars) => prevWebinars.filter((webinar) => webinar.id !== webinarId));
    };

    const handleEdit = (webinarId: number) => {
        setWebinarToEdit(webinarId);
        setEditDialogOpen(true);
    };

    const addWebinar = (data: FormData) => {
        const webinarData: WebinarData = {
          id: webinars.length + 1,
          title: data.title,
          date: data.date?.toISOString().split('T')[0] || '',
          start_time: data.startTime,
          end_time: data.endTime,
          speaker: {
            id: 5,
            firstName: data.firstName,
            lastName: data.lastName,
            picture: '',
            company: data.company,
            jobTitle: data.jobTitle,
            description: data.speakerDescription,
          },
        };
    
        setWebinars([...webinars, webinarData]);
        setAddDialogOpen(false);
    };

    const editWebinar = (data: WebinarData) => {
        const updatedWebinars = webinars.map((webinar) => {
          if (webinar.id === data.id) {
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
                <Grid key={webinar.id} item xs={12} sm={6} md={4} lg={4} xl={3} sx={{ justifyContent: 'center', maxWidth: '240px', flex: '1 0 auto' }}>
                    
                    <AdminEventCard webinar={webinar} onEdit={() => handleEdit(webinar.id)} onDelete={() => handleDelete(webinar.id)} />
                    {webinarToEdit === webinar.id && (
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
