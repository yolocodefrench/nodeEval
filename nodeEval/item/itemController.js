var itemModel = require('./itemModel.js');

/**
 * itemController.js
 *
 * @description :: Server-side logic for managing items.
 */
module.exports = {

    /**
     * itemController.list()
     */
    list: function (req, res) {
        itemModel.find(function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting item.',
                    error: err
                });
            }
            return res.json(items);
        });
    },

    /**
     * itemController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        itemModel.findOne({_id: id}, function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting item.',
                    error: err
                });
            }
            if (!item) {
                return res.status(404).json({
                    message: 'No such item'
                });
            }
            return res.json(item);
        });
    },

    /**
     * itemController.create()
     */
    create: function (req, res) {
        var item = new itemModel({
			label : req.body.label,
			image : req.body.image,
			description : req.body.description

        });

        item.save(function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating item',
                    error: err
                });
            }
            return res.status(201).json(item);
        });
    },

    /**
     * itemController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        itemModel.findOne({_id: id}, function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting item',
                    error: err
                });
            }
            if (!item) {
                return res.status(404).json({
                    message: 'No such item'
                });
            }

            item.label = req.body.label ? req.body.label : item.label;
			item.image = req.body.image ? req.body.image : item.image;
			item.description = req.body.description ? req.body.description : item.description;
			
            item.save(function (err, item) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating item.',
                        error: err
                    });
                }

                return res.json(item);
            });
        });
    },

    /**
     * itemController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        itemModel.findByIdAndRemove(id, function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the item.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
