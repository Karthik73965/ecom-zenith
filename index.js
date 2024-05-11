import express from 'express'
import { DbConnect } from './db/db.js'
import authrouter from './routes/auth.router.js'
import cookieParser from 'cookie-parser';


const port = 8080
const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/auth' , authrouter)

app.get('/', (req,res)=>{
    res.json("server is running")
})
DbConnect().then(()=>{
    app.listen(port , ()=>{
        console.log(`server is running on port ${port}`)
    })
}).catch(()=>{
    console.log("error");
})