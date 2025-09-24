const express = require('express');
const router = express.Router();
const StockContrller = require('../controller/stockController');
const UsersController = require('../controller/userController');
const upload = require('../config/multerConfig');
const checkToken = require('../middleware/checkToken');

router.post('/stock/create', upload.single('image'), checkToken, StockContrller.create); // Criar nota

router.get('/stock/show', checkToken, StockContrller.getAll); // Obter todas as notas do usuário
router.get('/stock/show/user_expecifi/:id', checkToken, StockContrller.getUser); // Obter todas as notas do usuário expecifico

router.put('/stock/update/:id', checkToken, StockContrller.update);
router.delete('/stock/delete/:id', checkToken, StockContrller.delete); // Deletar nota

router.post('/users/create', UsersController.create); // Criar usuário
router.post('/users/auth', UsersController.auth); // Fazer login

module.exports = router;