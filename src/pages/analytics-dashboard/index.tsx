import { useState, useEffect, forwardRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { Grid } from "@mui/material";
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DatePicker from 'react-datepicker'

// ** Next Import
import dynamic from 'next/dynamic'

import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import AutocompleteComponent from "src/views/pages/dashboard/AutoComplete";
import DistributionOfPediatricians from "src/views/pages/dashboard/DistributionOfPediatricians";
import Maps from "src/views/pages/dashboard/Maps";
import TableOfPediatricians, { TableBodyRowType } from "src/views/pages/dashboard/TableOfPediatricians";
import Statistics from "src/views/pages/dashboard/Statistics";
import PageHeader from 'src/@core/components/page-header';
import ChartjsBarChart from 'src/views/charts/ChartjsBarChart'
import ApexColumnChart from 'src/views/charts/ApexColumnChart'

const RechartsPieChart = dynamic(() => import('src/views/charts/ApexDonutChart'), { ssr: false })

import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Third Party Styles Import
import 'chart.js/auto'

const AnalyticsDashboard = () => {
  // ** Hook
  const theme = useTheme()

  const barChartYellow = '#ffcf5c'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled

  const [cityValue, setCityValue] = useState<string>('All')
  const [categoryValue, setCategoryValue] = useState<string>('All')
  const [specialityValue, setSpecialityValue] = useState<string>('All')
  const [regionValue, setRegionValue] = useState<string>('')
  const [value, setValue] = useState<string>('')

  const [mapLatitude, setMapLatitude] = useState<number>(31.7917); // Initial latitude value for the map
  const [mapLongitude, setMapLongitude] = useState<number>(-7.0926); // Initial longitude value for the map
  const [centerFiltred, setCenterFiltred] = useState<{ lat: number; lng: number }>({ lat: 31.7917, lng: -7.0926 });

  const handleCityValue = (e: SelectChangeEvent) => {
    setCityValue(e.target.value)
  }

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleCategoryValue = (e: SelectChangeEvent) => {
    setCategoryValue(e.target.value)
  }

  const handleSpecialityValue = (e: SelectChangeEvent) => {
    setSpecialityValue(e.target.value)
  }

  const handleRegionValue = (e: SelectChangeEvent) => {
    setRegionValue(e.target.value)
  }
 


  // State to keep track of the selected row in the TableOfPediatricians component
  const [selectedMedicalTable, setSelectedMedicalTable] = useState<TableBodyRowType | null>(null);



  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {/* Filter By */}
        <Grid item xs={12} >
          <Card>
            <CardHeader title='Filter By' />
            <CardContent>
              <Grid container spacing={6}>
               <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'left', mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id='pediatre-city-select'>City</InputLabel>
                    <Select
                      fullWidth
                      value={cityValue}
                      label='City'
                      onChange={handleCityValue}
                      labelId='pediatre-city-select'
                    >
                      <MenuItem value='All'>All</MenuItem>
                      <MenuItem value='marrakech'>Marrakech</MenuItem>
                      <MenuItem value='casablanca'>Casablanca</MenuItem>
                      <MenuItem value='agadir'>Agadir</MenuItem>
                      <MenuItem value='rabat'>Rabat</MenuItem>
                      <MenuItem value='tanger'>Tanger</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'left', mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id='category-select'>category</InputLabel>
                    <Select
                      fullWidth
                      value={categoryValue}
                      label='Category'
                      onChange={handleCategoryValue}
                      labelId='category-select'
                    >
                      <MenuItem value='All'>All</MenuItem>
                      <MenuItem value='hospital'>Hopital</MenuItem>
                      <MenuItem value='clinical'>Clinique</MenuItem>
                      <MenuItem value='cabinet'>Cabinet</MenuItem>
                      <MenuItem value='pharmacy'>Pharmacie</MenuItem>
                      <MenuItem value='doctor'>Doctor</MenuItem>
                    </Select>
                  </FormControl>
                  {categoryValue === 'doctor' && (
                <FormControl fullWidth sx={{ marginLeft: '16px' }}>
                <InputLabel id='specialty-select'>Specialty</InputLabel>
                <Select
                  fullWidth
                  value={specialityValue}
                  label='Specialty'
                  onChange={handleSpecialityValue}
                  labelId='specialty-select'
                >
                  <MenuItem value='All'>All</MenuItem>
                  <MenuItem value='pediatre'>Pediatre</MenuItem>
                  <MenuItem value='cardiologue'>Cardiologue</MenuItem>
                  {/* Add more specialties as needed */}
                </Select>
                </FormControl>
)}
               </Grid>
              </Grid>
              
            </CardContent>
            
          </Card>
        </Grid>

        {/* Statistics */}
        {categoryValue !== 'All' ? (
        <Grid item xs={12}>
          <Statistics cityValue={cityValue} category={categoryValue} speciality={specialityValue} />
        </Grid>):null}

        {/* TableOfPediatricians */}
        {categoryValue !== 'All' ? (
        <Grid item xs={12} md={6}>
          <TableOfPediatricians value={value} handleFilter={handleFilter} cityValue={cityValue} category={categoryValue} speciality={specialityValue} setSelectedMedical={setSelectedMedicalTable} />
        
        </Grid>
        ):null}


{categoryValue === 'All' ? (
          <Grid item xs={12} >
        <Card sx={{ marginBottom: '20px' }}>
          <CardHeader
            subheader='Geographical Distribution of Medical Centers'
            subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
          />
          <CardContent>
            <Grid container spacing={2}>
              {/* Premier composant à gauche */}
              {categoryValue === 'All' && (
                <Grid item xs={12} md={6}>
                  <RechartsPieChart cityValue={cityValue}/>
                </Grid>
              )}

              {/* Maps */}
              <Grid item xs={12} md={6}>
                <Maps cityValue={cityValue} category={categoryValue} speciality={specialityValue} selectedMedicalTable={selectedMedicalTable}/>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
          </Grid>):null}


          {categoryValue !== 'All' ? (
   <Grid item xs={12} md={6}>
   <Maps  cityValue={cityValue} category={categoryValue} speciality={specialityValue} selectedMedicalTable={selectedMedicalTable}/>
 </Grid>

          ):null}






       
        <Grid item xs={12} md={12}>
        <PageHeader
            title={
              <Typography variant='h5'>
                <Link  target='_blank'>
                General statistics
                </Link>
              </Typography>
            }
            // subtitle={<Typography variant='body2'>Pediatrician Stats</Typography>}
          />
        </Grid>

        {/* DistributionOfPediatricians */}
        {categoryValue !== 'All' ? (
         <Grid item xs={12} md={6}>
          <DistributionOfPediatricians />
        </Grid> ):null}
 
        {/* ChartjsBarChart */}

        {categoryValue === 'All' ? (

          <Grid item xs={12} md={12}>
          <ApexColumnChart />
          </Grid>

          ):null}

        {categoryValue !== 'All' ? (
        <Grid item xs={12} md={6}>
          <ChartjsBarChart category={categoryValue} yellow={barChartYellow} labelColor={labelColor} borderColor={borderColor} />
        </Grid>
        
        ):null}
      </Grid>
    </ApexChartWrapper>
  )
};

export default AnalyticsDashboard;