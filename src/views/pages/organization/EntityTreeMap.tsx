// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {  EntityTreeMap } from 'src/types/apps/dashboard'
import { AppDispatch } from 'src/store'
import SimpleSpinner from 'src/@core/components/spinner/Spinner'
import { fetchEntityTreemap } from 'src/store/apps/organization/components/EntityTreemap'

type EntityTreeMapProps = {
  id: string
}

const EntityTreeMapChart = ({ id }: EntityTreeMapProps) => {
  // ** Hook
  const theme = useTheme()
  const [data, setData] = useState<any>([])
  const dispatch = useDispatch<AppDispatch>()
  const { status } = useSelector((state: any) => state.organization.entityTreemap)
  const [key, setKey] = useState<number>(0)

  const getData = (id: string) => {
    dispatch(fetchEntityTreemap(id))
      .unwrap()
      .then((res: EntityTreeMap) => {
        const series = res.series
        setData(series)
        console.log(series);
        
        setKey(key + 1)
      })
      .catch(err => {
        console.log(err)
      })
  }
 

  useEffect(() => {
    getData(id)
  }, [id])
 
 const colors = [
  '#fdd835',
  '#00d4bd',
  '#826bf8',
  '#32baff',
  '#ffa1a1'
];

const defaultOptions: ApexOptions = {
  chart: {
    type: 'treemap',
    parentHeightOffset: 0,
      toolbar: { show: false },
  },
  colors: colors,
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false,
        shadeIntensity: 0.5,
        
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '26px', // Change to desired size
    },
    formatter: function(text: string) {
        return getShortName(text, 15);
    }
  },
  tooltip: {
    y: {
      formatter: function(value) {
        return value + " mentions";
      }
    }
  }
};
const  getShortName = (name : string, maxLength  = 15)=> {
    if (name.length <= maxLength) {
      return name;
    }
  
    return `${name.substring(0, maxLength)}...`;
  }

  return (
    <Card>
      <CardHeader
        
        subheader={``}
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent sx={{ pt: `${theme.spacing(3)} !important` }}>
        <Box
          sx={{
            pb: 6
          }}
        >
          {status === 'loading' ? (
            <SimpleSpinner sx={{ height: 400 }}></SimpleSpinner>
          ) : (
            <ReactApexcharts
              key={key}
              type='treemap'
              height={400}
              options={defaultOptions}
              series={data}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default EntityTreeMapChart
