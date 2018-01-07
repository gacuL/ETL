let tasksRepository = require('../repositories/task-repository');
let extractService = require('../services/extract-service');
let extractController = function (router, io) {
    router
        .route('/extract/:id')
        .get((req, res) => {
            /**
             * @api{get} /extract
             * @apiName Extract
             * @apiGroup Extract
             * @apiParam {Number} id
             * @apiVersion 0.1.0
             *
             * @apiSuccess {Object} Product data
             * @apiSuccessExample Example data on success:
             * {
             * brand: Sony
             * model: k500
             * pages: 10
             * date: 10-12-2016
             * id: 2234235,
             * opinions: 123,
             */
                let itemId = req.params.id;
                tasksRepository.getTaskById(itemId)
                    .then(() => tasksRepository.checkIfTaskExist(itemId))
                    .then((result) => tasksRepository.createTask(itemId))
                    .then(createdTask => tasksRepository.saveTask(createdTask))
                    .then((savedTask) => {
                        res.json('Extraction has started now');
                        extractService.fetchPageData(itemId, 1)
                            .then((fetchedData) => tasksRepository.saveFetchedDataToFile(fetchedData, itemId))
                            .then((savedData) => {
                                let modifiedData = JSON.parse(savedData);
                                let obj = {
                                    id: modifiedData.id,
                                    model: modifiedData.model,
                                    numOfPages: modifiedData.numOfPages,
                                    opinions: modifiedData.opinions.length,
                                    brand: modifiedData.brand

                                };
                                io.emit('extractedData', obj);
                                req.socket.end();

                            });
                    }).catch((err)=>{
                        io.emit('errorExctractedData', err);
                })

            });
};

module.exports = extractController;