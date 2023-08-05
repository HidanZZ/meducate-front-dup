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
  category: string
}

const ChartjsBarChart = (props: BarProp) => {
  const { yellow, labelColor, borderColor, category } = props // Destructure cityValue from props

  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appeler le service getCategoryCountsByCity pour récupérer les données
        const data = await AnalyticsDashboard.getCategoryCountsByCity(category)

        // Extraire les noms de ville et les comptes de la réponse du service
        const labels = Object.keys(data)
        const counts = Object.values(data)

        // Mettre à jour les données du graphique
        const updatedData: ChartData<'bar'> = {
          labels: labels,
          datasets: [
            {
              maxBarThickness: 15,
              backgroundColor: yellow,
              borderColor: 'transparent',
              // borderRadius: { topRight: 15, topLeft: 15 },
              data: counts as number[], // Assurer que counts est de type number[]
            },
          ],
        }
        setChartData(updatedData)
      } catch (error) {
        console.error('Error while fetching category counts by city:', error)
      }
    }

    fetchData()
  }, [yellow, category])

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor,
        },
        ticks: { color: labelColor },
      },
      y: {
        min: 0,
        max: 70,
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor,
        },
        ticks: {
          stepSize: 10,
          color: labelColor,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  }

  return (
    <Card>
      <CardHeader title={`${category} distribution by city`} />
      <CardContent>
        <Bar data={chartData} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsBarChart