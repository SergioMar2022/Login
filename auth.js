const User = require('./user');

// Función para validar las credenciales del usuario y crear la sesión
function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOneByEmailAndPassword(email, password)
    .then(function(user) {
      if (!user) {
        res.render('login', { error: 'Credenciales incorrectas' });
      } else {
        req.session.user = {
          email: user.email,
          role: user.role
        };
        res.redirect('/products');
      }
    })
    .catch(function(err) {
      console.log(err);
      res.render('login', { error: 'Error en la autenticación' });
    });
    }
