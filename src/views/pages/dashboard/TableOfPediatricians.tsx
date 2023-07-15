// ** React Import
import { ReactElement } from 'react'
import { useEffect,  useState} from 'react'
// ** MUI Imports
import { GridRowId } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import OptionsMenu from 'src/@core/components/option-menu'
import Optionsville from 'src/@core/components/select_ville'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { CardActions, CardContent } from '@mui/material'

interface TableBodyRowType {
  _id: number
  name: string
  address: string
  avatarSrc?: string
  reviews_count: number, 
  reviews_average: number,
  phone_number: number
}

interface CellType {
  row: TableBodyRowType
}

interface RoleObj {
  [key: string]: {
    color: ThemeColor
    icon: ReactElement
  }
}

interface commentsObj {
  [key: string]: {
    color: ThemeColor
  }
}

// const rows: TableBodyRowType[] = [
//   {
//     id: 1,
//     phone: 611223345,
//     avis: 'positif',
//     reviews_count: 5, 
//     reviews_average: 5,
//     username: 'webSite',
//     name: 'Joseph Wheeler',
//     adress: 'nuroani@icpair.com',
//     avatarSrc: '/images/avatars/1.png'
//   },
//   {
//     id: 2,
//     avis: 'negatif',
//     name: 'May Lloyd',
//     phone: 612345689,
//     reviews_count: 5, 
//     reviews_average: 5,
//     adress: 'jeju@ma.co.uk',
//     username: '@hredmore1',
//     avatarSrc: '/images/avatars/2.png'
//   },
//   {
//     id: 3,
//     avis: 'positif',
//     phone: 677635674,
//     username: '@msicely2',
//     name: 'William Mckinney',
//     reviews_count: 5, 
//     reviews_average: 5,
//     adress: 'cidagehe@nonalbo.com'
//   },
//   {
//     id: 4,
//     phone: 613243563,
//     avis: 'positif',
//     name: 'Warren Clarke',
//     username: '@mhurran4',
//     reviews_count: 5, 
//     reviews_average: 5,
//     adress: 'hirasles@zozzetkuv.edu',
//     avatarSrc: '/images/avatars/5.png'
//   },
//   {
//     id: 5,
//     phone: 616287487,
//     avis: 'negatif',
//     username: '@crisby3',
//     reviews_count: 5, 
//     reviews_average: 5,
//     name: 'Isabel Briggs',
//     adress: 'temiwiho@ohacma.gov'
//   },
//   {
//     id: 6,
//     phone: 682743874,
//     avis: 'neutre',
//     adress: 'boz@peh.co.uk',
//     name: 'Adeline Bennett',
//     reviews_count: 5, 
//     reviews_average: 5,
//     username: '@shalstead5',
//     avatarSrc: '/images/avatars/4.png'
//   },
//   {
//     id: 7,
//     phone: 687136823,
//     avis: 'positif',
//     name: 'Lora Simpson',
//     adress: 'dude@oco.nl',
//     reviews_count: 5, 
//     reviews_average: 5,
//     username: '@bkildayr',
//     avatarSrc: '/images/avatars/8.png'
//   }
// ]

const roleObj: RoleObj = {
  author: {
    color: 'success',
    icon: <Icon icon='mdi:cog' />
  },
  maintainer: {
    color: 'primary',
    icon: <Icon icon='mdi:chart-pie' />
  },
  editor: {
    color: 'info',
    icon: <Icon icon='mdi:pencil' />
  },
  subscriber: {
    color: 'warning',
    icon: <Icon icon='mdi:account-outline' />
  }
}

const commentsObj: commentsObj = {
  positif: { color: 'success' },
  negatif: { color: 'warning' },
  neutre: { color: 'secondary' }
}

const renderUserAvatar = (row: TableBodyRowType) => {
  if (row.avatarSrc) {
    return <CustomAvatar src={row.avatarSrc} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3, width: 30, height: 30, fontSize: '.8rem' }}>
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 200,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderUserAvatar(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                mb: -0.5,
                fontWeight: 600,
                lineHeight: 1.72,
                fontSize: '0.875rem',
                letterSpacing: '0.22px'
              }}
            >
              {row.name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'adress',
    headerName: 'adress',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
        {row.address}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'phone',
    headerName: 'phone',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
        {row.phone_number}
      </Typography>
    )
  },
  

]
interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}
const AnalyticsTable = (props: TableHeaderProps) => {


  const [pediatriciansData, setPediatriciansData] = useState<TableBodyRowType[]>([]);

  useEffect(() => {
    const fetchPediatricians = async () => {
      try {
        const response = await fetch('http://localhost:8000/pediatre'); 
        const data = await response.json();
        const limitedData = data.slice(0, 9); // Limiter les données aux 10 premiers éléments
        setPediatriciansData(limitedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des pédiatres :', error);
      }
    };
  
    fetchPediatricians();
  }, []);
  

  
  const rows = pediatriciansData.map((pediatrician) => ({
    id: pediatrician._id,
    name: pediatrician.name,
    address: pediatrician.address,
    phone_number: pediatrician.phone_number,
  }))

  // ** Props
  const { value,  handleFilter } = props
  return (

    <Card>
  {/* <CardHeader
    title='Pediatricians'
   

  /> */}

  <DataGrid sx={{ marginTop: '0.5rem'  }} autoHeight hideFooter rows={rows} columns={columns} disableSelectionOnClick pagination={undefined} />
</Card>

  )
}

export default AnalyticsTable
