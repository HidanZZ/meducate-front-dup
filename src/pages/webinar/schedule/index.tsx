import React from 'react';
import ReducedEventCard from 'src/views/pages/webinar/cards/ReducedEventCard';
import { Grid, Typography, Divider, Box} from '@mui/material';  



const WebinarList = () => {
  const daysOfWeek = [
    {
        day:'Monday',
        webinars:[ 
            {
                id: 4,
                title: 'Webinar 4',
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
                id: 5,
                title: 'Webinar 5',
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
                id: 6,
                title: 'Webinar 6',
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
            }
        ]
    },
    
    {
        day: 'Tuesday',
        webinars: [
            {
                id: 6,
                title: 'Webinar 6',
                date: '2023-08-15',
                start_time: '10:00',
                end_time: '11:00',
                speaker:{
                    id: 6,
                    firstName: 'John',
                    lastName: 'Smith',
                    picture: '',
                    company: 'Data Analytics Inc',
                    jobTitle: 'Data Scientist',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',    
                }
            }
        ]

    }, 
    {
        day:'Wednesday',
        webinars: [
            {
                id: 5,
                title: 'Webinar 5',
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
            }
        ]

    }, 
    {
        day:'Thursday',
        webinars: [
            {
                id: 1,
                title: 'Webinar 1',
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
                id: 2,
                title: 'Webinar 2',
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
            }
        ]
    }, 
    {
        day:'Friday',
        webinars: [
            {
                id: 3,
                title: 'Webinar 3',
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
        ]
    }];

  return (
    <Grid container spacing={2}>
        <Typography variant="h3" component="h1">
            Schedule
        </Typography>
      {daysOfWeek.map((day) => (
        <Grid item xs={12} key={day.day}>
            <Divider />
            <Typography variant="h5" component="h2">
                {day.day}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {day.webinars.sort((a, b) => a.start_time.localeCompare(b.start_time)).map((webinar) => (
                    <Box key={webinar.id} m={4} sx={{ flex: '0 0 auto', minWidth: '300px', maxWidth: '400px' }}>
                        <Typography variant="subtitle1">
                            {webinar.start_time} - {webinar.end_time}
                        </Typography>
                        <ReducedEventCard webinar={webinar} />
                    </Box>
                ))}
            </Box>

        </Grid>
      ))}
    </Grid>
  );
};

    



export default WebinarList;
