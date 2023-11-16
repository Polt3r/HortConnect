const express = require('express');
const router = express.Router();
const PostReceita = require('../models/postReceita');




// Rota para obter todos os dados do banco
router.get('/', async (req, res) => {
  try {
    const Receitas = await PostReceita.find();
    res.json(Receitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// rota para pegar apenas o _id e nome do banco de dados
router.get('/Nomeid', async (req, res) => {
  try {
    const alimentos = await PostReceita.find().select('nome');
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// rota para pegar apenas o _id e nome do banco de dados
router.get('/NomeTempoFoto', async (req, res) => {
  try {
    const alimentos = await PostReceita.find().select('nome').select('tempoDePreparo').select('foto.imagem_pequena')
    
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});







// Rota para pesquisar por nome no banco
router.get('/:nome', getReceita, (req, res) => {
  res.json(res.alimento);
});





// função para pegar um dado por nome
async function getReceita(req, res, next) {
  try {
    const postAlimento = await PostReceita.findOne({ nome: req.params.nome });

    if (postAlimento == null) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    
    res.alimento = postAlimento;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o registro' });
  }
};







// Rota para pesquisar por nome no banco
router.get('/nomeIncompleto/:nome', getReceitaIncompleta, (req, res) => {
  res.json(res.alimento);
});




async function getReceitaIncompleta(req, res, next) {

  const nomeIncompleto = req.params.nome;

  try {
    const postAlimento = await PostReceita.find({ nome: { $regex: nomeIncompleto, $options: 'i' } });

    if (postAlimento == null) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    
    res.alimento = postAlimento;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o registro' });
  }
};






























// Rota para deletar um registro
router.delete('/deletarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;

  try {
    // Use o método findOneAndDelete para buscar e deletar o registro
    const deletedPostAlimento = await PostReceita.findOneAndDelete({ nome: nome });

    if (!deletedPostAlimento) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.status(200).json({ message: 'Registro deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o registro' });
  }
});



  // anotações muito uteis, não excluir
  // tipoDoAlimento: req.body.id_topico[0].subTopico[0].nomesubTopico,
  //     nomeCientifico: req.body.id_topico[0].nomeTopico,
  




// busca no banco de dados pelos ingredientes da Receita
  router.get('/buscaIngredientes/:ingrediente', async (req, res) => {
    const ingrediente = req.params.ingrediente;
  
    try {
      // Use o método findOneAndDelete para buscar e deletar o registro
      const registrosEncontrados = await PostReceita.find({ "ingredientes.nome": ingrediente });

      res.json(registrosEncontrados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar o registro' });
    }
  });











// cria nova receita
router.post('/', async(req, res) => {

    try {
    

    const dadosDaAPI = req.body;
    const Receita = converterDadosAPIReceitas(dadosDaAPI);
    const newPostReceita = await Receita.save();

    // Responder com o novo documento criado
    res.status(201).json(newPostReceita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





const converterDadosAPIReceitas = (dadosAPI) => {
  

const fotoGrande = dadosAPI.foto.imagem_grande;
const fotoMedia = dadosAPI.foto.imagem_media;
const fotoPequena = dadosAPI.foto.imagem_pequena;

  const novaReceita = new PostReceita({
    nome: dadosAPI.nome,
    foto: {
      imagem_grande: {
        filename: fotoGrande.filename,
        name: fotoGrande.name,
        mime: fotoGrande.mime,
        extension:  fotoGrande.extension,
        url: fotoGrande.url,
      },
      imagem_media: {
        filename: fotoMedia.filename,
        name: fotoMedia.name,
        mime: fotoMedia.mime,
        extension:  fotoMedia.extension,
        url: fotoMedia.url,
      },
      imagem_pequena: {
        filename: fotoPequena.filename,
        name: fotoPequena.name,
        mime: fotoPequena.mime,
        extension:  fotoPequena.extension,
        url: fotoPequena.url,
      },
      excluir: dadosAPI.foto.excluir,
      
    },
    tempoDePreparo: dadosAPI.tempoDePreparo,
    ingredientes: [],
    modoDePreparo: [],
  });

  for (const ingredientes of Object.values(dadosAPI.ingredientes)) {
    const ingredientes_array = {
      
      nome: ingredientes.nome,
      
    };
    novaReceita.ingredientes.push(ingredientes_array);
  }


  for (const modoDePreparo of Object.values(dadosAPI.modoDePreparo)) {
    const ingredientes_array = {
      
      passos: modoDePreparo.passos,
      
    };
    novaReceita.modoDePreparo.push(ingredientes_array);
  }



  return novaReceita;
};























// Rota para editar por Nome
router.put('/editarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;
  const novosDados = req.body; // Novos dados para atualização

  try {
    // Use o método findOneAndUpdate para buscar e atualizar o registro
    const postAlimento = await PostReceita.findOneAndUpdate(
      { Nome: nome },
      novosDados,
      { new: true } // Para retornar o documento atualizado
    );

    if (!postAlimento) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.status(200).json(postAlimento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar o registro' });
  }
});


module.exports = router;
