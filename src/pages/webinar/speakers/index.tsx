// ** MUI Imports
import Grid from '@mui/material/Grid'
import SpeakerCard from 'src/views/pages/webinar/cards/SpeakerCard'

const Speakers = () => {

  const speakers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      picture: '',
      company: 'meducate',
      jobTitle: 'CEO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      picture: '',
      company: 'meducate',
      jobTitle: 'junior developer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Smith',
      picture: '',
      company: 'meducate',
      jobTitle: 'senior developer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Jones',
      picture: '',
      company: 'meducate',
      jobTitle: 'Cardiovascular Surgeon',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Lee',
      picture: '',
      company: 'meducate',
      jobTitle: 'Neurosurgeon',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus risus. Nunc mollis a tortor eu mattis. Etiam scelerisque magna ac pretium faucibus. Ut arcu felis, gravida eget vulputate nec, tincidunt ut ante. Curabitur cursus nulla eros, eu dictum lectus elementum sollicitudin. Aenean rutrum erat non ullamcorper semper. Maecenas lacus ante, aliquam hendrerit turpis eget, ullamcorper elementum orci. Sed lacinia molestie diam eu dapibus. Nullam suscipit, tortor at commodo pharetra, enim nisi tristique magna, a consectetur dui odio et tellus. Vivamus lobortis odio urna, sit amet sollicitudin neque scelerisque at. Suspendisse tempus nibh vitae odio tempor imperdiet. Suspendisse at enim mollis, vestibulum mi in, porttitor magna. Sed et luctus diam. Quisque convallis imperdiet enim, sit amet elementum arcu tincidunt sed.',
    },
  ];


  return (
    
    <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'wrap', justifyItems: 'center'}}>
      
      {speakers.map((speaker) => (
        <Grid key={speaker.id} item xs={12} sm={6} md={4} lg={3} sx={{ justifyContent:'center', maxWidth: '240px', flex: '1 0 auto' }}>
            <SpeakerCard speaker={speaker} />
        </Grid>
      ))}
      
    </Grid>
    
  )
}

export default Speakers
