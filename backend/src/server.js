import express from "express"
import ApiRouter from "./routes/api"
import connect from "./config/connect"
import bodyParser from "body-parser"
import config from "./config/cors"
import cors from "cors"

require("dotenv").config()
require('./config/uploadCleanup');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
ApiRouter(app)
connect(app)
config(app)


const PORT = process.env.PORT || 8001
app.listen (PORT,() =>{
   console.log(`Server running http://localhost:${PORT}`);
})



 