import * as brain from 'brain.js';
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

const trainDataSet=[
	{ temperature: 25, humidity: 40, windspeed: 15, crop: "Wheat" },
	{ temperature: 28, humidity: 45, windspeed: 20, crop: "Maize" },
	{ temperature: 31, humidity: 46, windspeed: 18, crop: "Jowar" },
	{ temperature: 33, humidity: 47, windspeed: 16, crop: "Sugarcane" },
	{ temperature: 35, humidity: 49, windspeed: 14, crop: "Rice" },
	{ temperature: 24, humidity: 42, windspeed: 12, crop: "Wheat" },
	{ temperature: 29, humidity: 44, windspeed: 17, crop: "Maize" },
	{ temperature: 32, humidity: 45, windspeed: 18, crop: "Jowar" },
	{ temperature: 34, humidity: 48, windspeed: 16, crop: "Sugarcane" },
	{ temperature: 36, humidity: 50, windspeed: 14, crop: "Rice" },
	{ temperature: 27, humidity: 43, windspeed: 15, crop: "Wheat" },
	{ temperature: 30, humidity: 47, windspeed: 19, crop: "Maize" },
	{ temperature: 33, humidity: 49, windspeed: 17, crop: "Jowar" },
	{ temperature: 35, humidity: 51, windspeed: 13, crop: "Sugarcane" },
	{ temperature: 23, humidity: 41, windspeed: 11, crop: "Rice" },
	{ temperature: 26, humidity: 43, windspeed: 14, crop: "Wheat" },
	{ temperature: 31, humidity: 46, windspeed: 18, crop: "Maize" },
	{ temperature: 34, humidity: 48, windspeed: 15, crop: "Jowar" },
	{ temperature: 37, humidity: 52, windspeed: 13, crop: "Sugarcane" },
	{ temperature: 22, humidity: 39, windspeed: 10, crop: "Rice" },
	{ temperature: 28, humidity: 45, windspeed: 15, crop: "Wheat" },
	{ temperature: 31, humidity: 47, windspeed: 19, crop: "Maize" },
	{ temperature: 33, humidity: 49, windspeed: 16, crop: "Jowar" },
	{ temperature: 35, humidity: 50, windspeed: 14, crop: "Sugarcane" },
	{ temperature: 24, humidity: 42, windspeed: 11, crop: "Rice" },
	{ temperature: 29, humidity: 44, windspeed: 16, crop: "Wheat" },
	{ temperature: 32, humidity: 46, windspeed: 20, crop: "Maize" },
	{ temperature: 34, humidity: 48, windspeed: 17, crop: "Jowar" },
	{ temperature: 36, humidity: 51, windspeed: 14, crop: "Sugarcane" },
	{ temperature: 23, humidity: 40, windspeed: 12, crop: "Rice" },
	{ temperature: 26, humidity: 43, windspeed: 15, crop: "Wheat" },
  ]

  const originalDataSet = trainDataSet.map((data)=>({
	input:{temperature:data.temperature, humidity:data.humidity, windspeed:data.windspeed},
	output:{crop:data.crop}
  }))
  
  const net = new brain.NeuralNetwork();
  net.train(originalDataSet);
  
app.post('/predict',async (req, res)=>{
    const city= req.body && req.body.city;
	const weatherRes = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
	const forecastRes = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}`)
	const weatherData = await weatherRes.json()
	const forecastData = await forecastRes.json()
	const temp = weatherData.current.temp_c
	const humidity = weatherData.current.humidity
	const windspeed = weatherData.current.wind_kph
	const maxTemp = forecastData.forecast.forecastday[0].day.maxtemp_c
	const minTemp = forecastData.forecast.forecastday[0].day.mintemp_c
	// const maxwind = forecastData.forecast.forecastday[0].day.maxwind_kph
	// const avgHumidity = forecastData.forecast.forecastday[0].day.avghumidity
    const normalizedInputData = {
		temperature: (temp - minTemp) / (maxTemp - minTemp),
		humidity: humidity,
		windspeed: windspeed
	  };
    console.log(normalizedInputData)
	const predictedData = net.run(normalizedInputData)
	const cropProbabilities = Object.entries(predictedData);
	console.log(cropProbabilities)
	res.json({message:'welocme',city, temp:temp, humidity:humidity, windspeed:windspeed, predictedData:predictedData.crop })
})

app.listen(PORT, ()=>{
	console.log('connected  on  port 4000')
})