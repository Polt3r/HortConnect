const mongoose = require('mongoose');




const subTopicoSchema = new mongoose.Schema({
  idSubTopico: {
    type: Number,
  },
  nomesubTopico: {
    type: String,
  },
  descricaosubTopico: {
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





const topicoSchema = new mongoose.Schema({
  idTopico: {
    type: Number,
  
  },
  nomeTopico: {
    type: String,
    
  },
  descricaoTopico: {
    type: String,
    
  },
  foto: FotoSchema,
  
  subTopico: [subTopicoSchema],
});










const postAlimentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    
  },
  tipoDoAlimento: {
    type: String,
    
  },
  nomeCientifico: {
    type: String,
  },

  descricaoVegetal:{
    type: String,
  },


  id_topico: [topicoSchema],
});

const PostAlimento = mongoose.model('PostAlimento', postAlimentoSchema);

module.exports = PostAlimento;