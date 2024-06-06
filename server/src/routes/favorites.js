const { Router } = require('express');
const { saveFavorite, getFavorites } = require('../controllers/favorites');
const { userAuth } = require('../middleware/auth-middleware');

const router = Router();

router.post('/favorites', userAuth, saveFavorite);
router.get('/favorites/:user_id', userAuth, getFavorites);

module.exports = router;
