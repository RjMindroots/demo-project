import express from "express";
import mongoose from "mongoose";
import routes from './src/routes'
import cors from 'cors'
import { CONNECTION_URL, DEBUG_MODE } from "./src/config";
import errorHandler from "./src/middleware/errorHandler";
const app = express()

app.use(cors())
// mongodb connection
mongoose.connect(`${CONNECTION_URL}`, 
	{
    useNewUrlParser: true,
    useUnifiedTopology: true
	}
).then(() => {
	console.log('Mongodb connected!')
}).catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

if((process.env.NODE_ENV = "production") || (DEBUG_MODE = false)){
  app.use(express.static("frontend/build"))
}

//routes
app.use('/api', routes)

app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
    console.log(`App is running on ${PORT}`)
})