var express = require('express');
var router = express.Router();
var listController = require('./listController.js');

/*
 * GET
 */
router.get('/', listController.list);

/*
 * GET
 */
router.get('/:id', listController.show);

/*
 * POST
 */
router.post('/', listController.create);

/*
 * PUT
 */
router.put('/:id', listController.update);

/*
 * PUT item in list 
 */
router.put('/:id/item/:idItem', listController.addItem);

/*
 * DELETE
 */
router.delete('/:id', listController.remove);

router.delete('/:id/item/:idItem', listController.removeItem);

module.exports = router;
