// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
// ** React Imports
import { useEffect, useState } from 'react'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
// ** Custom Components Imports
//import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from './Avatar';

interface DataType {
  title: string
  imgAlt: string
  imgSrc: string
  amount: string
  subtitle: string
  imgWidth: number
  imgHeight: number
  avatarColor: string
}

interface StatisticsProps {
  cityValue: string
}

interface MedicalData {
  _id: { libelle: string; speciality: string }[]
  count: number
}

const RechartsPieChart = (props: StatisticsProps) => {
  const { cityValue } = props

  // ** State
  const [datas, setDatas] = useState<MedicalData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8000/getMedicalDataCountByCategory'
        if (cityValue !== 'All') {
          apiUrl = 'http://localhost:8000/getMedicalDataCountsByCity'
        }
        const response = await fetch(apiUrl)
        const jsonData = await response.json()
        if (cityValue !== 'All') {
          const cityData = jsonData[cityValue];
          if (cityData) {
            const categoryData: MedicalData[] = Object.keys(cityData).map((category) => ({
              _id: [{ libelle: category, speciality: '' }],
              count: cityData[category],
            }));
            setDatas(categoryData);
          } else {
            setDatas([]);
          }
        }else {
          setDatas(jsonData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [cityValue])
  const getCategoryColor = (category: string): string => {
    return avatarColors[category] || 'red'; // Use the specified color, or 'red' as default
  };
  return (
    <Card>
      <CardHeader
        subheader={cityValue === 'All' ? 'In Morroco' : `In ${cityValue}`}
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
       
      />
      <CardContent>
        {datas.map((item: MedicalData, index: number) => {
          const dataItem: DataType = {
            imgWidth: 20,
            imgHeight: 22,
            title: item._id[0].libelle,
            imgAlt: item._id[0].libelle,
            amount: `${item.count}`,
            avatarColor: getCategoryColor(item._id[0].libelle),
            subtitle: 'Number of '+item._id[0].libelle,
            imgSrc: `/images/cards/${item._id[0].libelle}.png`,
          }
          
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== datas.length - 1 ? { mb: 6 } : {}),
              }}
            >
             <CustomAvatar
              sx={{ mr: 3 }}
              variant="rounded"
              backgroundColor={dataItem.avatarColor}
            >     
                       <img alt={dataItem.imgAlt} src={dataItem.imgSrc} width={dataItem.imgWidth} height={dataItem.imgHeight} />
              </CustomAvatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column',    marginLeft: '10px' }}>
                  <Typography sx={{ mb: 0.25, fontWeight: 600, fontSize: '0.875rem' }}>{dataItem.title}</Typography>
                  <Typography variant='caption'>{dataItem.subtitle}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ mr: 1, fontWeight: 600 }}>{dataItem.amount}</Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}  ;
const avatarColors: { [key: string]: string } = {
  hospital: 'red',
  clinical: 'yellow',
  doctor: 'blue',
  pharmacy: 'blue',
  cabinet:'green',
  centre:'orange'
  // You can add more categories and their respective colors here
  // For other categories, a default color will be used (you can set it below)
};

export default RechartsPieChart
