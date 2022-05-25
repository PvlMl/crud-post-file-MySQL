const Router = require('express').Router;
const router = new Router();
const userController = require('../conrollers/user-controller');
const validation = require('../middleware/validation');
const checkToken = require('../middleware/checkToken');

router.post('/registration', validation.checkAuthorData, userController.registration);
router.post('/authorization', userController.authorization);
router.post('/edit', checkToken, userController.editMessage);
router.post('/upload', checkToken, userController.addMediaFile)
router.get('/users', userController.getPosts);
router.get('/media/:file', userController.getFile);
router.delete('/delete', checkToken, userController.deletePost);
module.exports = router;