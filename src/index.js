const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
//routes admin
const datosPRoutes = require('./routes/datosP');
const paisRoutes = require('./routes/pais');
const path = require('path');
const lugarRoutes = require('./routes/lugar');
const estadoRoutes = require('./routes/estado');
const ciudadRoutes = require('./routes/ciudad');
const perfilesRoutes = require('./routes/perfiles');
//routes user
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const datosEstudiosRoutes = require('./routes/datosEstudios');
const datosLaboralesRoutes = require('./routes/datosLaborales');
const datosExperienciaRoutes = require('./routes/datosExperiencia');


//settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // Agrega morgan para registrar las solicitudes

//routes
app.use('/api', datosPRoutes);
app.use('/api', paisRoutes);
app.use('/api', lugarRoutes);
app.use('/api', estadoRoutes);
app.use('/api', ciudadRoutes);
app.use('/api', perfilesRoutes);
app.use('/api', userRoutes);
app.use('/api', loginRoutes);
app.use('/api', datosEstudiosRoutes);
app.use('/api',datosLaboralesRoutes);
app.use('/api',datosExperienciaRoutes);
//static file
app.use(express.static(path.join(__dirname, 'dist')));

//start server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});
