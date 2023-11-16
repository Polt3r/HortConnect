const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const cors = require('cors');
const bodyParser = require('body-parser'); // Importe o body-parser

dotenv.config();

const app = express();


app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *; img-src * data:; font-src * data:;"
  );
  next();
});



app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Use o body-parser com o limite aumentado

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Use o body-parser com o limite aumentado
app.use(express.json());


const PostRouter = require('./routes/alimentoRoutes');
app.use('/alimentos', PostRouter);

const ReceitasRouter = require('./routes/receitaRoutes');
app.use('/receitas', ReceitasRouter);

const formularioRoutes = require('./routes/formularioRoutes');
app.use('/formulario', formularioRoutes);






mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB Atlas!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;




