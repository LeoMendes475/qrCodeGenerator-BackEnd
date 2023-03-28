import express, { response, request } from "express";
import { body, validationResult } from "express-validator";
import db from "../services/userservice.js";
const router = express.Router();

// Método POST, tem a função de enviar e receber dados, neste exemplo ele envia para a service os dados recebidos do body do front-end
router.post('/', [
  // Está área é responsável para que seja validado os dados recebidos do front-end
  body('userName').isLength({min: 1}).withMessage('Informe um nome de usuário válido'),
  body('linkedin').isLength({min: 1}).withMessage('Informe um Linkedin válido'),
  body('github').isLength({min: 1}).withMessage('Informe um GitHub válido'),
], async (request, response) => {
  // recebe os dados do front-end
  const { userName, linkedin, github } = request.body;
  // faz as verificacões dos dados recebidos pelo front-end com base no que foi definido no [] após o router.post('/',
  const erros = validationResult(request);
  // se após a verificação dos dados for verificado que há algum erro ele retorna o status 400 com a mensagem definida anterior mente
  if (!erros.isEmpty()) {
    return response.status(400).json({ message: erros.array() });
  }

  // tenta cadastrar o usuário no banco de dados
  try {
    // envia os dados do front-end para o banco de dados, por meio da função insert user
    await db.insertUser(userName, linkedin, github);

    // se após as verificações tudo ocorrer como deveria ele retorna um status 201 com a mensagem de sucesso
    if (response.status(201)) {
      response.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }

  } catch (err) {
    // caso haja algúm erro após as verificações a variável err capitura o erro e a api retorna o status 500 e informa o erro ocorrido
    response.status(500).json({ message: `Encontramos um erro: ${err}` })
  }
});

// Método GET tem a função de apenas enviar dados, neste exemplo ele busca os dados do banco de dados e retona ao usuário os resultados da busca
router.get('/', async (request, response) => {
    try {
      const results = await db.findUser();
  
      if (!results) {
        response.status(204).end();
      } else {
        response.status(200).json(results);
      }
    } catch (err) {
      response.status(500).json({ message: `Encontramos um erro: ${err}` });
    }
  });
  

// exporta o arquivo
export default router;