const itemsRepository = require('../repositories/items-repository');
const tasksRepository = require('../repositories/task-repository');
const service = require('../services/parse-service');

let entireProcess = function (router, io) {

    router
        .route('/entire-process/:id')
        .get((req, res) => {
            /**
             * @api{get} /entire-process
             * @apiName EntireProcess
             * @apiGroup EntireProcess
             * @apiParam {Number} id
             * @apiVersion 0.1.0
             *
             * @apiSuccess {Object} Product data
             * @apiSuccessExample Example data on success:
             * {
             * model: Sony
             * pages: 10
             * date: 10-12-2016
             * id: 2234235
             */
            const itemId = req.params.id;
            tasksRepository.getTaskById(itemId)
                .then(() => tasksRepository.checkIfTaskExist(itemId))
                .then((result) => tasksRepository.createTask(itemId))
                .then(createdTask => tasksRepository.saveTask(createdTask))
                .then((savedTask) => {
                    res.json('Process has just now been created');
                    service.fetchPageData(savedTask.id, 1)
                        .then((fetchedData) => itemsRepository.saveItemToDb(fetchedData))
                        .then((savedData) => tasksRepository.updateTaskStatus(savedTask, true))
                        .then((updatedTask) => tasksRepository.getFinishedTask(savedTask.id))
                        .then((finishedTask) => {
                            itemsRepository.getItemById(finishedTask)
                                .then((data) => {

                                    const obj = {
                                        model: data.model,
                                        pages: data.numOfPages,
                                        date: finishedTask.date,
                                        id: finishedTask.id
                                    };
                                    io.emit('result', obj);
                                    req.socket.end();
                                });
                        });
                })
                .catch((err) => {
                    io.emit('result', err);
                    req.socket.end();
                })
        });

    router
        .route('/entire-process/')
        .get((req, res) => {
            /**
             * @api{get} /entire-process
             * @apiName EntireProcess
             * @apiGroup EntireProcess
             * @apiVersion 0.1.0
             *
             * @apiSuccess {Array} Return all fetched products
             * @apiSuccessExample Example data on success:
             * [{
             * model: Sony
             * pages: 10
             * date: 10-12-2016
             * id: 2234235
             * },
             * {
             * model: LG,
             * pages: 1,
             * date: 11-12-2017,
             * id: 1241
             * }]
             */
            tasksRepository.getAllFinishedTasks()
                .then((result) => {
                    res.json(result);
                })
        });

    router
        .route('/entire-process/:id')
        .post((req, res) => {
            let itemId = req.params.id;
            res.json('Process has just now been created');
            service.fetchPageData(itemId, 1)
                .then((fetchedData) => itemsRepository.updateItem(fetchedData))
                .then((savedData) => tasksRepository.updateTaskDate(itemId, true))
                .then((updatedTask) => tasksRepository.getFinishedTask(itemId))
                .then((finishedTask) => {
                    itemsRepository.getItemById(finishedTask)
                        .then((data) => {

                            let obj = {
                                model: data.model,
                                pages: data.numOfPages,
                                date: finishedTask.date,
                                id: finishedTask.id
                            };
                            io.emit('result', obj);
                            req.socket.end();
                        })
                        .catch((err) => {
                            console.log(err);
                            io.emit('result', err);
                            req.socket.end();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.json(err);

                    io.emit('result', err);
                    req.socket.end();
                })
        });
};

module.exports = entireProcess;