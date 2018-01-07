let tasksRepository = require('../repositories/task-repository');
let loadRepository = require('../repositories/load-repository');

let loadController = function (router, io) {
    router
        .route('/load/:id')
        .get((req, res) => {
            /**
             * @api{get} /load
             * @apiName Load
             * @apiGroup Load
             * @apiParam {Number} id
             * @apiVersion 0.1.0
             *
             * @apiSuccess {Object} Product data which is saved to database
             * @apiSuccessExample Example data on success:
             * {
             * model:k500,
             * pages:10,
             * date: 25-12-2017,
             * id: 123
             */
            const itemId = req.params.id;

            tasksRepository.readFetchDataFromFile(itemId)
                .then((fetchedData) => loadRepository.saveItemToDb(fetchedData))
                .then((savedData) => tasksRepository.getTaskById(itemId))
                .then((task) => loadRepository.updateTaskStatus(itemId, true))
                .then((updatedTask) => tasksRepository.getFinishedTask(itemId))
                .then((finishedTask) => {
                    loadRepository.removeFile(itemId);
                    loadRepository.getItemById(itemId)
                        .then((data) => {

                            const obj = {
                                model: data.model,
                                pages: data.numOfPages,
                                date: finishedTask.date,
                                id: data.id
                            };

                            res.status(200).json(obj);
                        });
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        })
};

module.exports = loadController;