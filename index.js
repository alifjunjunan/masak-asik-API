const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const bearerToken = require('express-bearer-token')
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bearerToken());

//db check connection
const {db} = require('./config/database');

db.getConnection((err,connection) => {
    if(err){
        console.log(`error mysql :`, err.message)
    }

    console.log(`connection to mysal server : ${connection.threadId}`) 
});

//routes api setup
app.get('/', (req,res) => {
    res.status(200).send('<h2>welcome to masak-asik api</h2>');
    
})

const {userRoute,resepRoute, kategoriRoute} = require('./routes')

app.use('/users',userRoute);
app.use('/resep',resepRoute);
app.use('/kategori',kategoriRoute);

app.listen(PORT,()=> {
    console.log('masak-asik api running : ',PORT);
})
