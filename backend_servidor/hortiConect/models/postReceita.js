const mongoose = require('mongoose');




const ingredientesShema = new mongoose.Schema({
  nome: {
    type: String,
    
  },
});

const ModoDePreparoShema = new mongoose.Schema({
  passos: {
    type: String,
    
  },
});

const FotoSchema = new mongoose.Schema({
  imagem_grande: {
    filename: {type: String,},
    name: {type: String,},
    mime: {type: String,},
    extension: {type: String,},
    url: {type: String,},
  },
  imagem_media: {
    filename: {type: String,},
    name: {type: String,},
    mime: {type: String,},
    extension: {type: String,},
    url: {type: String,},
  },
  imagem_pequena: {
    filename: {type: String,},
    name: {type: String,},
    mime: {type: String,},
    extension: {type: String,},
    url: {type: String,},
  },
  excluir: {type: String,},

});


const receitaSchema = new mongoose.Schema({
  nome: {
    type: String,
    
  },
  foto: FotoSchema,
  
  tempoDePreparo:{
    type:String,
  },
  ingredientes: [ingredientesShema],
  modoDePreparo: [ModoDePreparoShema],
});

// Crie o modelo com base no esquema
const Receita = mongoose.model('Receita', receitaSchema);

module.exports = Receita;