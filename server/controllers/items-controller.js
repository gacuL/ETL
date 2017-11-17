const itemsRepository = require('../repositories/items-repository');
const tasksRepository = require('../repositories/task-repository');
//const {fork} = require('child_process');

let itemsController = function (router, io) {
    router
        .route('/items/:id')
        .get((req, res) => {
            let itemId = req.params.id;
            // res.status(200).json('This process already exist');
            tasksRepository.checkIfTaskExist(itemId)
                .then((result) => tasksRepository.createTask(itemId))
                .then(createdTask => tasksRepository.saveTask(createdTask))
                .then((savedTask) => {
                    console.log(savedTask);
                    res.json('Process has just now been created');
                    itemsRepository.fetchPageData(savedTask.processId, 1)
                        .then((fetchedData) => tasksRepository.saveFetchedDataToFile(fetchedData, savedTask.processId))
                        .then((savedData) => tasksRepository.updateTaskStatus(savedTask))
                        .then((updatedTaskStatus) => tasksRepository.getFinishedTask(savedTask.processId))
                        .then((finishedTask) => {
                            console.log('task has finished');
                            io.emit('result', finishedTask);
                        })
                })
                .catch((err) => {
                    res.json(err);
                    console.log('err', err);
                })
        });

    router
        .route('/items/')
        .get((req, res) => {
            tasksRepository.getAllFinishedTasks()
                .then((result) => {
                    res.json(result);
                })
        });
};
module.exports = itemsController;