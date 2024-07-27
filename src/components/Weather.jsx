import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false)
    const [cityName, setCityName] = useState("")
    const allIcons = {
        'o1d': clear_icon,
        'o1n': clear_icon,
        'o2d': cloud_icon,
        'o2n': cloud_icon,
        'o3d': cloud_icon,
        'o3n': cloud_icon,
        'o4d': drizzle_icon,
        'o4n': drizzle_icon,
        'o9d': rain_icon,
        'o9n': rain_icon,
        'o10d': rain_icon,
        'o10n': rain_icon,
        'o13d': snow_icon,
        'o13n': snow_icon,
         
        
    }
    const search = async (city) => {
        if (city=="") {
            alert('please provide a city name')
            return;
        }
       
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            const response = await fetch(url)
            const data = await response.json();
            if(!response.ok) {
                alert(data.message);
                return;
            }
            console.log(data) 
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("there is something wrong with the fetching of the data")
        }
    }

    useEffect(()=>{
        search('Laos');
    },[])
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} name="city-name" type="text" placeholder='Search' onChange={(e)=>{setCityName(e.target.value)}}/>
            <img src={search_icon} alt="" onClick={()=>{search(inputRef.current.value)}}/>
        </div>
        {weatherData? <>
            <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}</p>
        <p className='location'>{weatherData.name}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                     <p>{weatherData.humidity}%</p>
                     <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                     <p>{weatherData.windSpeed}km/hr</p>
                    <span>wind speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
       
    </div>
  )
}

export default Weather