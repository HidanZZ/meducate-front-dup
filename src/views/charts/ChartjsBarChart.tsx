import { useState, useEffect } from 'react'
import AnalyticsDashboard from 'src/services/analyticsDashboard'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Bar } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'

interface BarProp {
  yellow: string
  labelColor: string
  borderColor: string
}

const ChartjsBarChart = (props: BarProp) => {
  const { yellow, labelColor, borderColor } = props // Destructure cityValue from props

  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AnalyticsDashboard.getPediatriciansCountByCity()


        const labels = data.map((item: { _id: string }) => item._id)
        const counts = data.map((item: { count: number }) => item.count)
        const updatedData: ChartData<'bar'> = {
          labels: labels,
          datasets: [
            {
              maxBarThickness: 15,
              backgroundColor: yellow,
              borderColor: 'transparent',
              borderRadius: { topRight: 15, topLeft: 15 },
              data: counts
            }
          ]
        }
        setChartData(updatedData)
      } catch (error) {
        console.error('Error while fetching pediatricians count by city:', error)
      }
    }

    fetchData()
  })


  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        min: 0,
        max: 300,
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor
        },
        ticks: {
          stepSize: 100,
          color: labelColor
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  return (
    <Card>
      <CardHeader title='Distribution by city' />
      <CardContent>
        <Bar data={chartData} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsBarChart
