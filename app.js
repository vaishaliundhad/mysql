

// import express from 'express';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // Test route
// app.get('/', (req, res) => {
  //   res.send('Hello from MySQL-connected app!');
  // });
  // useRoutes(app);
  // connectToDatabase();
  
  // app.listen(PORT, () => {
    //   console.log(`🚀 Server running on port ${PORT}`);
    // });
    
    
import mysql from 'mysql2/promise';
import useRoutes from './src/routes/routes.js';
import { connectToDatabase } from './src/libs/database/mysql.db.js';
import express from 'express'

const app = express()
const PORT = 3000;



app.use(express.json());

// const db = await mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password :"Admin@123",
//   database:"courseProject"
// })



  app.get('/test', (req, res) => {
    res.send('Server and routes working!');
  });


  
  app.listen(PORT , ()=>{
    console.log(`server running http://localhost:${PORT}`)
  })
  
await connectToDatabase()
useRoutes(app)
console.log("mysql connection successfully")

// console.log(await db.execute ("show databases"))