import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import cookieParser from 'cookie-parser';
import pageRoute from './routes/pageRoute.js';
import photoRoute from './routes/photoRoute.js';
import userRoute from './routes/userRoute.js';
import { checkUser } from './middlewares/authMiddleware.js';



dotenv.config();

//connection to the DB
conn();


const app = express();
const port = process.env.PORT;
const hostname = '127.0.0.1'

//ejs template engine
app.set('view engine', 'ejs');

//static files middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());


//router
app.get('*', checkUser); // öncelikle bu get fun. kontrol etmek gerekli...
app.use("/", pageRoute)
app.use("/photos", photoRoute)
app.use("/users", userRoute)

/* app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
}); */





app.listen(port, hostname, () => {
    console.log(`Server läuft auf, http://${hostname}:${port}/`)
})
