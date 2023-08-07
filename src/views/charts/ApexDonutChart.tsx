import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';

import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';

import CustomAvatar from './Avatar';

 

interface DataType {

  title: string;

  imgAlt: string;

  imgSrc: string;

  amount: string;

  subtitle: string;

  imgWidth: number;

  imgHeight: number;

  avatarColor: string;

}

 

interface StatisticsProps {

  cityValue: string;

}

 

interface MedicalData {
  _id: string; // Utilisation du libellé de la catégorie comme chaîne de caractères
  count: number;
}

 

const RechartsPieChart = (props: StatisticsProps) => {

  const { cityValue } = props;

 

  const [datas, setDatas] = useState<MedicalData[]>([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8000/getMedicalDataCountByCategory';
        if (cityValue !== 'All') {
          apiUrl = 'http://localhost:8000/getMedicalDataCountsByCity';
        }
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        
        if (cityValue !== 'All') {
          const cityData = jsonData[cityValue];
          
          if (cityData) {
            const categoryData: MedicalData[] = Object.keys(cityData).map((category) => ({
              _id: category,
              count: cityData[category],
            }));
            setDatas(categoryData);
          } else {
            setDatas([]);
          }
        } else {
          const categoryData: MedicalData[] = jsonData.map((item: any) => ({
            _id: item._id, // Use the provided _id field directly
            count: item.count,
          }));
          setDatas(categoryData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [cityValue]);
  

 

  const getCategoryColor = (category: string): string => {

    const avatarColors: { [key: string]: string } = {

      hospital: 'red',

      clinical: 'yellow',

      doctor: 'blue',

      pharmacy: 'purple',

      cabinet: 'green',

      centre: 'orange',

      // You can add more categories and their respective colors here

      // For other categories, a default color will be used (you can set it below)

    };

    return avatarColors[category] || 'red'; // Use the specified color, or 'red' as default

  };

 
  return (
    <Card>
      <CardHeader
        subheader={cityValue === 'All' ? 'In Morroco' : `In ${cityValue.charAt(0).toUpperCase() + cityValue.slice(1)}`}
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent>
        {datas.map((item: MedicalData, index: number) => {
          const libelle = item._id; // Le libellé est directement le champ _id dans la réponse

          const dataItem: DataType = {
            imgWidth: 20,
            imgHeight: 22,
            title: libelle,
            imgAlt: libelle,
            amount: `${item.count}`,
            avatarColor: getCategoryColor(libelle),
            subtitle: 'Number of ' + libelle,
            imgSrc: `/images/cards/${libelle}.png`,
          };
 

          return (

            <Box

              key={index}

              sx={{

                display: 'flex',

                alignItems: 'center',

                ...(index !== datas.length - 1 ? { mb: 6 } : {}),

              }}

            >

              <CustomAvatar sx={{ mr: 3 }} variant="rounded" backgroundColor={dataItem.avatarColor}>

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

                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

                  <Typography sx={{ mb: 0.25, fontWeight: 600, fontSize: '0.875rem' }}>{dataItem.title}</Typography>

                  <Typography variant="caption">{dataItem.subtitle}</Typography>

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

          );

        })}

      </CardContent>

    </Card>

  );

};

 

export default RechartsPieChart;

 