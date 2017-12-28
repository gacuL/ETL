const itemsRepository = require('../repositories/items-repository');
const tasksRepository = require('../repositories/task-repository');
const service = require('../services/parse-service');

let entireProcess = function (router, io) {
    router
        .route('/entire-process/:id')
        .get((req, res) => {
            let itemId = req.params.id;
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

                                    let obj = {
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