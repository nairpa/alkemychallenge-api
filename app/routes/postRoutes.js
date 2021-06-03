const posts = require('../controllers/postsController.js');
const express = require('express')
const router = express.Router();

router.post('/', posts.create);
router.get('/', posts.findAll);
router.get('/:id', posts.findOne);
router.put('/:id', posts.update);
router.delete('/:id', posts.deleteById);

module.exports = router;