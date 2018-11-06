var listModel = require('./listModel.js');

/**
 * listController.js
 *
 * @description :: Server-side logic for managing lists.
 */
module.exports = {

    /**
     * listController.list()
     */
    list: function (req, res) {
        listModel.find(function (err, lists) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting list.',
                    error: err
                });
            }
            return res.json(lists);
        });
    },

    /**
     * listController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        listModel.findOne({_id: id}, function (err, list) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting list.',
                    error: err
                });
            }
            if (!list) {
                return res.status(404).json({
                    message: 'No such list'
                });
            }
            return res.json(list);
        });
    },

    /**
     * listController.create()
     */
    create: function (req, res) {
        var list = new listModel({
			name : req.body.name,
			user : req.body.user,
			items : req.body.items

        });

        list.save(function (err, list) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating list',
                    error: err
                });
            }
            return res.status(201).json(list);
        });
    },

    /**
     * listController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        listModel.findOne({_id: id}, function (err, list) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting list',
                    error: err
                });
            }
            if (!list) {
                return res.status(404).json({
                    message: 'No such list'
                });
            }

            list.name = req.body.name ? req.body.name : list.name;
			list.user = req.body.user ? req.body.user : list.user;
			list.items = req.body.items ? req.body.items : list.items;
			
            list.save(function (err, list) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating list.',
                        error: err
                    });
                }

                return res.json(list);
            });
        });
    },

    addItem: function (req, res) {
        var id = req.params.id;
        var item = req.params.idItem;
        try{
            item = parseInt(item)
            listModel.update(
                { _id: id },
                { $addToSet: { 'items':   item } }, 
                function (err, list){
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating list.',
                            error: err
                        });
                    }   
                    return res.json(list);
                })
        }
        catch(err){
            console.log("troubles")
            res.send("Unable to update the list")
        }
    },
    removeItem: function (req, res) {
        var id = req.params.id;
        var item = req.params.idItem;
        try{
            item = parseInt(item)
            listModel.update(
                { _id: id },
                { $pull: { 'items':   item } }, 
                function (err, list){
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating list.',
                            error: err
                        });
                    }   
                    return res.json(list);
                })
        }
        catch(err){
            console.log("troubles")
            res.send("Unable to update the list")
        }
    },
    /**
     * listController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        listModel.findByIdAndRemove(id, function (err, list) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the list.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
