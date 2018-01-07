'use strict';

let tasksRepository = require('../repositories/task-repository');
let transformRepository = require('../repositories/transform-repository');

let transformController = function (router, io) {
    router
        .route('/transform/:id')
        .get((req, res) => {
            /**
             * @api{get} /transform
             * @apiName Transform
             * @apiGroup Transform
             * @apiParam {Number} id
             * @apiVersion 0.1.0
             *
             * @apiSuccess {Object} Product Id and info about successfull transformation
             * @apiSuccessExample Example data on success:
             * {
             * id: 123,
             * info: Dane zostaly oczyszczone
             */
            let itemId = req.params.id;

            tasksRepository.readFetchDataFromFile(itemId)
                .then((data) => transformRepository.transformFetchedData(data))
                .then((data) => tasksRepository.saveFetchedDataToFile(data, itemId))
                .then((data) => {
                    const transformedData = JSON.parse(data);
                    const obj = {
                        info: "Dane zostaly oczyszczone",
                        id: transformedData.id
                    };

                    res.status(200).json(obj);
                })
                .catch((err) => {
                   res.status(500).json(err);
                })
        });
};

module.exports = transformController;