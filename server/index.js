import express from 'express';
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json()); 
const PORT = 4000
const API_KEY  = '9e58f1b7d50042398c734338240302'
app.get('/',(req, res)=>{
	res.send({message:'hello'})
})


app.post('/predict',async (req, res)=>{
    const city= req.body && req.body.city;
	const weatherRes = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
	const weatherData = await weatherRes.json()
	const temp = weatherData.current.temp_c
	const humidity = weatherData.current.humidity
	const windspeed = weatherData.current.wind_kph
	res.json({message:'welocme',city, temp:temp, humidity:humidity, windspeed:windspeed })
})

app.listen(PORT, ()=>{
	console.log('connected  on  port 4000')
})