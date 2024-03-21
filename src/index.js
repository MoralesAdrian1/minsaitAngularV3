const  express = require('express');
const app = express();
const cors= require('cors');
const morgan = require('morgan'); 
const datosPRoutes = require('./routes/datosP');
const paisRoutes = require('./routes/pais');
const path = require('path');
const lugarRoutes = require('./routes/lugar');
const estadoRoutes = require('./routes/estado');
const ciudadRoutes = require('./routes/ciudad');
const perfilesRoutes = require('./routes/perfiles');
const userRoutes = require('./routes/user');
//settings
app.set('views',path.join(__dirname,'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use('/api',datosPRoutes);
app.use('/api',paisRoutes);
app.use('/api',lugarRoutes);
app.use('/api',estadoRoutes);
app.use('/api',ciudadRoutes);
app.use('/api', perfilesRoutes);
app.use('/api',userRoutes);

//static file
app.use(express.static(path.join(__dirname,'dist')));


//start server
app.listen(app.get('port'), ()=>{
    console.log('server on port ', app.get('port'));
});
//app.use(morgan,('dev'));