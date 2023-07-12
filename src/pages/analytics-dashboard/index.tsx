// ** React Imports
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


import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import AutocompleteComponent from "src/views/pages/dashboard/AutoComplete";
import DistributionOfPediatricians from "src/views/pages/dashboard/DistributionOfPediatricians";
import Maps from "src/views/pages/dashboard/Maps";
import TableOfPediatricians from "src/views/pages/dashboard/TableOfPediatricians";
import Statistics from "src/views/pages/dashboard/Statistics";
import ChartjsBarChart from 'src/views/charts/ChartjsBarChart'

import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Third Party Styles Import
import 'chart.js/auto'

const AnalyticsDashboard = () => {

    // ** Hook
  const theme = useTheme()

    const barChartYellow = '#ffcf5c'
    const borderColor = theme.palette.divider
    const labelColor = theme.palette.text.disabled
   
    const [cityValue, setCityValue] = useState<string>('')
    const [regionValue, setRegionValue] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const handleCityValue = (e: SelectChangeEvent) => {
        setCityValue(e.target.value)
      }

      const handleFilter = (val: string) => {
        setValue(val)
      }
   
      const handleRegionValue = (e: SelectChangeEvent) => {
        setRegionValue(e.target.value)
      }
    
    return(
        <ApexChartWrapper>
            {/* speace between search and the first component */}
            <Grid item xs={12}>
          <Card>
            <CardHeader title='Filter By' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='pediatre-city-select'>City</InputLabel>

                    <Select
                      fullWidth
                      value={cityValue}
                      sx={{ mr: 4, mb: 2 }}
                      label='City'
                      onChange={handleCityValue}
                      labelId='pediatre-city-select'
                    >
                      <MenuItem value='marrakech'>Marrakech</MenuItem>
                      <MenuItem value='asfi'>Asfi</MenuItem>
                      <MenuItem value='casablanca'>Casablanca</MenuItem>
                      <MenuItem value='fes'>Fes</MenuItem>
                      <MenuItem value='meknes'>Meknes</MenuItem>
                      <MenuItem value='tanger'>Tanger</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='pediatre-region-select'>Region</InputLabel>

                    <Select
                      fullWidth
                      value={regionValue}
                      sx={{ mr: 4, mb: 2 }}
                      label='City'
                      onChange={handleRegionValue}
                      labelId='pediatre-region-select'
                    >
                      <MenuItem value='marrakechSafi'>Marrakech-Safi</MenuItem>
                      <MenuItem value='casablancaSettat'>Casablanca-settat</MenuItem>
            
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Grid>
            <Grid container spacing={6}>
                {/* the search's componenet */}
                <Grid item xs={12}  >
                    
                </Grid>
                <Grid item xs={12}  >
                    <Statistics />
                </Grid>
                <Grid item xs={12} md={6} >
                    <TableOfPediatricians value={value}  handleFilter={handleFilter}/>
                </Grid>
                {/* wight:md */}
                <Grid item xs={12} md={6} style={{ position: 'relative' }}>
                <Maps />
                </Grid>
                
                <Grid item xs={12} md={6} >
                    <DistributionOfPediatricians />
                </Grid>
                <Grid item xs={12} md={6}>
                <ChartjsBarChart yellow={barChartYellow} labelColor={labelColor} borderColor={borderColor} />
                </Grid>
                            
            </Grid>
        </ApexChartWrapper>
    )

};


export default AnalyticsDashboard;