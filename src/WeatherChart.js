import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

function WeatherChart({ weatherData, cityName }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (weatherData) {
      const temperatures = weatherData.list.map(item => item.main.temp)
      const timeLabels = weatherData.list.map(item => item.dt_txt)
      const descriptions = weatherData.list.map(item => item.weather[0].description)

      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [{
            label: 'Temperature',
            data: temperatures,
            fill: false,
            borderColor: '#4bc0c0',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#4bc0c0',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4bc0c0',
            lineTension: 0.1,
            descriptions: descriptions
          }]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              backgroundColor: '#2c3e50',
              titleFontColor: '#fff',
              bodyFontColor: '#fff',
              callbacks: {
                label: function(context) {
                  const temperatureLabel = `Weather: ${context.parsed.y}°F`;
                  const descriptionLabel = ` with ${context.dataset.descriptions[context.dataIndex]}`;
                  return temperatureLabel + descriptionLabel;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                fontColor: '#ccc',
                padding: 10
              }
            },
            y: {
              ticks: {
                fontColor: '#ccc',
                padding: 10
              },
              min: Math.min(...temperatures) - 2,
              max: Math.max(...temperatures) + 2,
              suggestedMin: Math.min(...temperatures) - 2,
              suggestedMax: Math.max(...temperatures) + 2
            }
          }
        }
      })

      return () => {
        chart.destroy();
      }
    }
  }, [weatherData]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">{cityName}</h2>
      <canvas ref={chartRef} width="800" height="400"></canvas>
    </div>
  )
}

export default WeatherChart;

