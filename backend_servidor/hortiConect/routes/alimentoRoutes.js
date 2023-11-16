const express = require('express');
const router = express.Router();
const PostAlimento = require('../models/postAlimento');






// Rota para obter todos os dados do banco
router.get('/', async (req, res) => {
  try {
    const alimentos = await PostAlimento.find();
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});











// rota para pegar apenas o _id e nome do banco de dados
router.get('/Nomeid', async (req, res) => {
  try {
    const alimentos = await PostAlimento.find().select('nome');
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// rota para pegar apenas o _id e nome do banco de dados
router.get('/soTopicos', async (req, res) => {
  try {
    const alimentos = await PostAlimento.find().select('id_topico');
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






// Rota as colunas nome, descriçãoVegetal e apenas a primeria imagem pequena no primeiro tópico

router.get('/nomeEdescricaoEfotoPequenasTodas', async (req, res) => {
  try {
    const alimentos = await PostAlimento.find({}, 'nome descricaoVegetal id_topico.foto.imagem_pequena')
      .lean()
      .exec();

    // Para cada documento, manter apenas a primeira imagem_pequena dentro de id_topico
    alimentos.forEach(alimento => {
      if (alimento.id_topico && alimento.id_topico.foto && alimento.id_topico.foto.imagem_pequena) {
        // Limitar a imagem_pequena para apenas o primeiro elemento
        alimento.id_topico.foto.imagem_pequena = alimento.id_topico.foto.imagem_pequena[0];
      }

      // Se houver mais de um id_topico, mantenha apenas o primeiro
      if (alimento.id_topico && Array.isArray(alimento.id_topico) && alimento.id_topico.length > 1) {
        alimento.id_topico = alimento.id_topico[0];
      }
    });

    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

































// Rota para pesquisar por nome no banco
router.get('/:nome', getAlimento, (req, res) => {
  res.json(res.alimento);
});

// função para pegar um registro por nome
async function getAlimento(req, res, next) {
  try {
    const postAlimento = await PostAlimento.findOne({ nome: req.params.nome });

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



































// Rota para pesquisar por nome incompleto no banco
router.get('/nomeIncompleto/:nome', getReceitaIncompleta, (req, res) => {
  res.json(res.alimento);
});


// Função para pesquisar por nome incompleto no banco

async function getReceitaIncompleta(req, res, next) {

  const nomeIncompleto = req.params.nome;

  try {
    const postAlimento = await PostAlimento.find({ nome: { $regex: nomeIncompleto, $options: 'i' } });

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






















router.delete('/deletarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;

  try {
    // Use o método findOneAndDelete para buscar e deletar o registro
    const deletedPostAlimento = await PostAlimento.findOneAndDelete({ nome: nome });

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
  






















// Rota para criar um novo contato
router.post('/', async (req, res) => {

  try {
    const dadosDaAPI = req.body;
    const postAlimento = converterDadosAPIEmPostAlimento(dadosDaAPI);

    // Salvar o novo documento no banco de dados
    const newPostAlimento = await postAlimento.save();

    // Responder com o novo documento criado
    res.status(201).json(newPostAlimento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Função para converter dados da API em postAlimento
const converterDadosAPIEmPostAlimento = (dadosAPI) => {




  const postAlimento = new PostAlimento({
    nome: dadosAPI.nome,
    tipoDoAlimento: dadosAPI.tipoDoAlimento,
    nomeCientifico: dadosAPI.nomeCientifico,
    descricaoVegetal:dadosAPI.descricaoVegetal,
    id_topico: [], // Inicialize um array vazio
  });

  for (const idTopicoData of Object.values(dadosAPI.id_topico)) {


    const fotoGrande = idTopicoData.foto.imagem_grande;
    const fotoMedia = idTopicoData.foto.imagem_media;
    const fotoPequena = idTopicoData.foto.imagem_pequena;
    




    const idTopicoObject = {
      idTopico: idTopicoData.idTopico,
      nomeTopico: idTopicoData.nomeTopico,
      descricaoTopico: idTopicoData.descricaoTopico,
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
        excluir: idTopicoData.foto.excluir,
        
      },
      subTopico: [], // Inicialize um array vazio
    };

    for (const subTopicoData of Object.values(idTopicoData.subTopico)) {
      const subTopicoObject = {
        idSubTopico: subTopicoData.idSubTopico,
        nomesubTopico: subTopicoData.nomesubTopico,
        descricaosubTopico: subTopicoData.descricaosubTopico,
      };

      idTopicoObject.subTopico.push(subTopicoObject);
    }

    postAlimento.id_topico.push(idTopicoObject);
  }

  return postAlimento;
};













































// Rota para editar por Nome
router.put('/editarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;
  const novosDados = req.body; // Novos dados para atualização

  try {
    // Use o método findOneAndUpdate para buscar e atualizar o registro
    const postAlimento = await PostAlimento.findOneAndUpdate(
      { nome: nome },
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
