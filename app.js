import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import pageRoute from './routes/pageRoute.js';


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

//router
app.use("/", pageRoute)

/* app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
}); */





app.listen(port, hostname, () => {
    console.log(`Server läuft auf, http://${hostname}:${port}/`)
})
