const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

// Configuración de la sesión
app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));

// Configuración del middleware de bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta para la pantalla de login
app.get('/', function(req, res) {
  res.render('login');
});

// Ruta para la pantalla de registro
app.get('/register', function(req, res) {
  res.render('register');
});

// Ruta para la pantalla de productos
app.get('/products', function(req, res) {
  res.render('products', { user: req.session.user });
});

// Ruta para el logout
app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Configuración del puerto y mensaje de inicio
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});
