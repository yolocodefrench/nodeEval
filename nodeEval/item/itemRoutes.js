var express = require('express');
var router = express.Router();
var itemController = require('./itemController.js');

/*
 * GET
 */
router.get('/', itemController.list);

/*
 * GET
 */
router.get('/:id', itemController.show);

/*
 * POST
 */
router.post('/', itemController.create);

/*
 * PUT
 */
router.put('/:id', itemController.update);

/*
 * DELETE
 */
router.delete('/:id', itemController.remove);

module.exports = router;
