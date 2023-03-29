import express, { response, request } from "express";
import db from "../services/pageService.js";
const router = express.Router();

router.get('/:userName', async (request, response) => {
    const { userName } = request.params;
    // por meio da função findUser ele faz a busca dos dados no banco de dados e salva essas informações na constante results
    const results = await db.findUser(userName);
  
    // Tenda mostrar os resultados, se for igual a 0 siginifica que não há dados e por isso ele retorna o status 204, caso haja dados ele retorna um status 200 com os resultados
    try {
      if (results.length == 0) {
        response.status(204).end();
      } else {le.log(results)
        console.log(results[0].linkedin)
        response.send(`
        <div style="display: flex;flex-direction: column; align-items: center;">
          <h2>Hello, my name is ${userName}</h2>
          <h1>My history</h1>

          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

          <div style="display: inline-block; margin-top: 20px">
            <a style="background-color: #fff;border: 1px solid;border-radius: 8px 8px 8px 8px;font-weight: bold;font-size: 20px; width: 30vw;height: 50px;padding: 14px 20px;cursor: pointer;text-decoration: none;    margin-left: 20px;" href="${results[0].github}" target="_blank">Github</a>
            
            <a style="background-color: #fff;border: 1px solid;border-radius: 8px 8px 8px 8px;font-weight: bold;font-size: 20px; width: 30vw;height: 50px;padding: 14px 20px;cursor: pointer;text-decoration: none;    margin-left: 20px;" href="${results[0].linkedin}" target="_blank">Linkedin</a>
          </div>
        </div>
      `);
      }
    }
  
    catch (err) {
      // caso haja algúm erro após as verificações a variável err capitura o erro e a api retorna o status 500 e informa o erro ocorrido
      response.status(500).json({ message: `Encontramos um erro: ${err}` });
      console.log(results[0].linkedin)
    }
  });

export default router;