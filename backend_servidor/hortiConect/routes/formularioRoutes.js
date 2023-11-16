const express = require('express');
const router = express.Router();
const Formulario = require('../models/formulario');


// Rota para obter todos os dados do banco
router.get('/', async (req, res) => {
  try {
    const Form = await Formulario.find();
    res.json(Form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Rota para pesquisar por id no banco
router.get('/:id', getForm, (req, res) => {
  res.json(res.Form);
});


// função para pegar um dado pelo _id ela é chamada na rota acima
async function getForm(req, res, next) {
  try {
    const novoForm = await Formulario.findOne({ _id: req.params.id });

    if (novoForm == null) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    
    res.Form = novoForm;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o registro' });
  }
};





// Rota para deletar um registro
router.delete('/deletarPorId/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Use o método findOneAndDelete para buscar e deletar o registro
    const deletedPostAlimento = await Formulario.findOneAndDelete({ _id: id });

    if (!deletedPostAlimento) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.status(200).json({ message: 'Registro deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o registro' });
  }
});







// cria um novo formulario
router.post('/', async(req, res) => {

  try {
    const dadosDaAPI = req.body;
    const Formulario = converterDadosAPIFormulario(dadosDaAPI);
    const novoForm = await Formulario.save();

    // Responder com o novo documento criado
    res.status(201).json(novoForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





const converterDadosAPIFormulario = (dadosAPI) => {
  


  const novoForm = new Formulario({
    nome: dadosAPI.nome,
    email: dadosAPI.email,
    titulo: dadosAPI.titulo,
    mensagem: dadosAPI.mensagem,
  });


  return novoForm;
};




module.exports = router;
