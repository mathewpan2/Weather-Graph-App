import React ,{useState} from 'react'
import './App.css'
import WeatherChart from './WeatherChart'
function App() {

    const apikey = process.env.REACT_APP_API_KEY
    const [weatherData, setWeatherData] = useState([{}])
    const [location, setLocation] = useState("")
    const [functionCalled, setFunctionCalled] = useState(false)
    const [city, setCity] = useState("")
 
  
    const getWeather = (event) => {
        if(event.key === "Enter") {
            console.log(process.env)
            const[city, state] = event.target.value.split(", ");
            setCity(city)
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&limit=1&appid=${apikey}`)
            .then(response => response.json()
            ).then(
                data => {          
                    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apikey}&units=imperial`)
                    .then(response => response.json()
                    ).then(
                        data => {
                            setWeatherData(data);
                            setFunctionCalled(true);
                        }
                    )

                }
            )      
        

        }
    }


    return (
    <div className='container'>
        <input className='input-field' 
        placeholder='Enter City, State...' 
        onChange={e => setLocation(e.target.value)}
        value={location}
        onKeyPress={getWeather}
        />

      {functionCalled && <WeatherChart weatherData={weatherData} cityName = {city} />}
    </div>
    
    )
}

export default App