const express = require('express');

module.exports = (app) => {
    const authRoutes = express.Router();
    const AuthController = require('./routes/auth');
    authRoutes.get('/login', AuthController.loginUser);
    authRoutes.post('/register', AuthController.registerUser);

    app.use('/auth', authRoutes);
};