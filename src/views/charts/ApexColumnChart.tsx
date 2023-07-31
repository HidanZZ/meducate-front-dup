import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import AnalyticsDashboard from 'src/services/analyticsDashboard';


import { useTheme } from '@mui/material/styles'; 
const columnColors = {
  bg: '#FFF0C9',
  series1: '#ffcf5c', // Yellow color for Hospital
  series2: '#ffd09a', // Light yellow color for Clinical
  series3: '#ffc08b', // Lighter yellow color for Pharmacy
  series4: '#ffc77c', // Lightest yellow color for Doctor
};

const ApexColumnChart = () => {
  
  // ** Hook
  const theme = useTheme()
  const [medicalData, setMedicalData] = useState([]);

  useEffect(() => {
    const fetchMedicalData = async () => {
      try {
        const data = await AnalyticsDashboard.getMedicalDataCountsByCity();
        setMedicalData(data);
      } catch (error) {
        console.error('Error while fetching medical data:', error);
      }
    };

    fetchMedicalData();
  }, []);

  // ** Options and Series
  const options: ApexOptions = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [columnColors.series1, columnColors.series2,columnColors.series3,columnColors.series4],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg]
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: Object.keys(medicalData),
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  };


  const series = [
    // Replace the static series data with dynamic data from the medical data
    {
      name: 'Hospital',
      data: Object.values(medicalData).map((data) => data['hospital'] || 0),
    },
    {
      name: 'Clinical',
      data: Object.values(medicalData).map((data) => data['clinical'] || 0),
    },
    {
      name: 'Pharmacy',
      data: Object.values(medicalData).map((data) => data['pharmacy'] || 0),
    },
    {
      name: 'Doctor',
      data: Object.values(medicalData).map((data) => data['doctor'] || 0),
    },
  ];

  return (
    <div>
      {/* Your JSX code here */}
      <ReactApexcharts type="bar" height={400} options={options} series={series} />
    </div>
  );
};

export default ApexColumnChart;
