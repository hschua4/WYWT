import React from 'react'
import { Line } from 'react-chartjs-2'
import './LineChart.css'

function LineChart(props) {
  const xAxis = props.weightData.map((item) => {
    const date = new Date(item.date)
    return(date.getDate() + '/' + (date.getMonth() + 1))
  })

  const yAxis = props.weightData.map(item => item.weight)

  const data = {
    labels: xAxis,
    datasets: [
      {
        label: 'My Weight (kg)',
        data: yAxis,
        borderColor: ['#ff1f66'],
        backgroundColor:['rgba(255,255,255,0)'],
        pointbackgroundColor: '#ff1f66',
        pointBorderColor: '#ff1f66'
      }
    ]
  }
  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Weight (kg)'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }]
    }     
  }

  return (
    <div className='chart-container'>
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChart
