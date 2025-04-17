
import app from './app'
import dotenv from 'dotenv'
import connectDb from './config/db'
import "./consumers/userConsumer";
import "./consumers/getAllUsersConsumer";


dotenv.config()
const PORT = Number(process.env.PORT)  || 5000

connectDb()


app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}`);
});





