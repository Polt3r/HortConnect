const mongoose = require('mongoose');


const formularioSchema = new mongoose.Schema({
  nome: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  titulo: {
    type: String,
    
  },
  mensagem: {
    type: String,
    
  },
  
});

// Crie o modelo com base no esquema
const Formulario = mongoose.model('Formulario', formularioSchema);

module.exports = Formulario;