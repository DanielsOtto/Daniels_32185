const express = require('express');
const { routerWeb } = require('./routers/routerWeb.js');
const { engine } = require('express-handlebars');
const app = express();
app.set('port', process.env.PORT || 8080);

// CONFIGURACION  Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//MIDDLEWARES
app.use(express.json());
app.use(express.static('public')); // averiguar bien esto
app.use(express.urlencoded({ extended: true }))

//RUTAS
app.use('/', routerWeb);

app.listen(app.get('port'), (req, res) => {
  try {
    console.log(`El servidor esta levantado en el puerto ${app.get('port')}`);
  } catch (error) {
    throw new Error('error al levantar el servidor');
  }
});