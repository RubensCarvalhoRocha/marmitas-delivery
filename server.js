const express = require('express');
const path = require('path');
const app = express();

// Caminho para os arquivos estáticos do build Angular
app.use(express.static(path.join(__dirname, 'dist/marmitas-delivery')));

// Redireciona todas as rotas para o index.html do Angular
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/marmitas-delivery/index.html'));
});

// Porta padrão do Heroku
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
