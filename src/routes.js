import express from "express";
import user from './controllers/userController.js';
import page from "./controllers/pageController.js";

// atribui a router as funçoes do express.Router()
const router = express.Router();

// faz uso das rotas definidas apartir do conteúdo da controller selecionada
router.use('/user', user);
router.use('/', page);

//exporta a router
export default router;