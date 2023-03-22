import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function WeatherChart({ weatherData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (weatherData) {
      const temperatures = weatherData.list.map(item => item.main.temp);
      const timeLabels = weatherData.list.map(item => item.dt_txt);

      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [{
            label: 'Temperature',
            data: temperatures,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  var label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y + '°F';
                  }
                  return label;
                }
              }
            }
          }
        }
      });

      return () => {
        chart.destroy();
      };
    }
  }, [weatherData]);

  return (
    <canvas ref={chartRef}></canvas>
  );
}

export default WeatherChart;