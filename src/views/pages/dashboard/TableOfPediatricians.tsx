// ** React Import
import { ReactElement } from 'react'

// ** MUI Imports
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
  id: number
  name: string
  adress: string
  username: string
  avatarSrc?: string
  comments: 'positif' | 'neutre' | 'negatif'
  reviews_count: number, 
  reviews_average: number,
  phone: number
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

const rows: TableBodyRowType[] = [
  {
    id: 1,
    phone: 611223345,
    comments: 'positif',
    reviews_count: 5, 
    reviews_average: 5,
    username: 'webSite',
    name: 'Joseph Wheeler',
    adress: 'nuroani@icpair.com',
    avatarSrc: '/images/avatars/1.png'
  },
  {
    id: 2,
    comments: 'negatif',
    name: 'May Lloyd',
    phone: 612345689,
    reviews_count: 5, 
    reviews_average: 5,
    adress: 'jeju@ma.co.uk',
    username: '@hredmore1',
    avatarSrc: '/images/avatars/2.png'
  },
  {
    id: 3,
    comments: 'positif',
    phone: 677635674,
    username: '@msicely2',
    name: 'William Mckinney',
    reviews_count: 5, 
    reviews_average: 5,
    adress: 'cidagehe@nonalbo.com'
  },
  {
    id: 4,
    phone: 613243563,
    comments: 'positif',
    name: 'Warren Clarke',
    username: '@mhurran4',
    reviews_count: 5, 
    reviews_average: 5,
    adress: 'hirasles@zozzetkuv.edu',
    avatarSrc: '/images/avatars/5.png'
  },
  {
    id: 5,
    phone: 616287487,
    comments: 'negatif',
    username: '@crisby3',
    reviews_count: 5, 
    reviews_average: 5,
    name: 'Isabel Briggs',
    adress: 'temiwiho@ohacma.gov'
  },
  {
    id: 6,
    phone: 682743874,
    comments: 'neutre',
    adress: 'boz@peh.co.uk',
    name: 'Adeline Bennett',
    reviews_count: 5, 
    reviews_average: 5,
    username: '@shalstead5',
    avatarSrc: '/images/avatars/4.png'
  },
  {
    id: 7,
    phone: 687136823,
    comments: 'positif',
    name: 'Lora Simpson',
    adress: 'dude@oco.nl',
    reviews_count: 5, 
    reviews_average: 5,
    username: '@bkildayr',
    avatarSrc: '/images/avatars/8.png'
  }
]

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
  neutre: { color: 'warning' },
  negatif: { color: 'secondary' }
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
            <Typography variant='body2' sx={{ fontSize: '0.75rem', letterSpacing: '0.4px' }}>
              {row.username}
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
        {row.adress}
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
        {row.phone}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'reviews average',
    headerName: 'reviews average',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
        {row.reviews_average}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'reviews count',
    headerName: 'reviews count',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
        {row.reviews_count}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 120,
    field: 'comments',
    headerName: 'comments',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        skin='light'
        label={row.comments}
        color={commentsObj[row.comments].color}
        sx={{
          height: 24,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4 }
        }}
      />
    )
  }
]

const AnalyticsTable = () => {
  return (

    <Card>
  <CardHeader
    title='Table Of Pediatricians'
    action={
      <OptionsMenu
        options={['Last 28 Days', 'Last Month', 'Last Year']}
        iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
      />
    }

  />
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Typography variant='body2' component='span' sx={{ marginTop: '0.7rem', marginLeft: '0.5rem' , color: 'text.primary', marginRight: '0.5rem' }}>
      The pediatricians in
    </Typography>
    <Optionsville iconButtonProps={{ size: 'small', sx: { color: 'text.primary',marginBottom: '0.2rem' } }} />
  </Box>
  <DataGrid sx={{ marginTop: '0.5rem'  }} autoHeight hideFooter rows={rows} columns={columns} disableSelectionOnClick pagination={undefined} />
</Card>

  )
}

export default AnalyticsTable
