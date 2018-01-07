'use strict';
const itemsRepository = require('../repositories/items-repository');

let itemsController = function (router, io) {
    router
        .route('/products/')
        .get((req, res) => {
            /**
             * @api{get} /items
             * @apiName Items
             * @apiGroup Items
             * @apiParam
             * @apiVersion 0.1.0
             *
             * @apiSuccess {Array} All fetched products with opinions
            */
            itemsRepository.getAllItems()
                .then((data)=>{
                res.status(200).json(data);
                })
                .catch((err) =>{
                res.status(500).json(err);
            });
        });
};

module.exports = itemsController;