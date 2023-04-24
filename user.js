const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definición del modelo de usuario
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

// Función para crear un usuario
userSchema.statics.create = function(email, password) {
  const user = new this({
    email: email,
    password: password
  });
  return user.save();
};

// Función para buscar un usuario por email y password
userSchema.statics.findOneByEmailAndPassword = function(email, password) {
  return this.findOne({ email: email, password: password });
};

// Exportación del modelo de usuario
module.exports = mongoose.model('User', userSchema);

