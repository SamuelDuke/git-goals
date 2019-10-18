const express = require('express');
const passport = require('passport');

const passportStrategy = require('./config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    passportStrategy(app);

    const authRoutes = express.Router();
    const AuthController = require('./routes/auth');
    authRoutes.post('/login', AuthController.generateJWTLocal);
    authRoutes.post('/register', AuthController.registerUser);

    app.use('/auth', authRoutes);

    const apiRoutes = express.Router();

    const userRoutes = express.Router();
    const UserController = require('./routes/user');
    userRoutes.get('/', UserController.getMe);

    apiRoutes.use('/users', userRoutes);

    app.use('/api', requireAuth, apiRoutes);

};