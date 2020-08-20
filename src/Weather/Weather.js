import React, { useState } from 'react';
import classes from './Weather.module.css';

const api = {
    key: 'c9ec0f73b4258bbb63fc1f333e4f9f39',
    baseURL: 'https://api.openweathermap.org/data/2.5/'
}

function Weather () {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');

    const search = event => {
        if (event.key === "Enter") {
            fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(resp => resp.json())
            .then(results => {setWeather(results);
            setQuery('');
            console.log(results);
            });
        }
    }

        // HOW TO OUTPUT CURRENT DATE TO THE UI
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July",
         "August", "September", "October", "November", "December"];
         
        let days = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday",
         "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`

    }
    return (

        <div className={classes.app}>
           <main>
              
               <div className={classes.searchBox}>
                   <input type="text" className={classes.searchBar}
                    placeholder="Search..." onChange={e => setQuery(e.target.value)}
                     value={query} onKeyPress={search}/>
               </div>
               
             {(typeof weather.main != "undefined") ? ( 
                 <div> 
               <div className={classes.locationBox}> 
                <div className={classes.location}>{weather.name}, {weather.sys.country} </div>
            {/* get current date */}
                <div className={classes.date}>{dateBuilder(new Date())}</div> 
               </div>
               <div className={classes.WeatherBox}>
                   <div className={classes.temp}>
                       <div className={classes.myTemp}>{Math.round(weather.main.temp)}°C</div>
                       </div>
                   <div className={classes.Weather}>{weather.weather[0].main}</div>
               </div>
               </div>
               ) : (' ')}
           </main>
            </div>
    );
}
export default Weather;
