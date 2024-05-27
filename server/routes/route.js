const express = require('express');
const { userSignUp, userLogin } = require('../controller/user-controller');
const { getProducts, getProductById } = require('../controller/product-controller');
const { addPaymentGateway, paytmResponse } = require('../controller/payment-controller');

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

// paytm
router.post('/payment', addPaymentGateway);
router.post('/callback', paytmResponse);




module.exports =  router ;