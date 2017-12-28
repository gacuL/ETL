let tasksRepository = require('../repositories/task-repository');
let extractService = require('../services/extract-service');
let extractController = function (router, io) {
    router
        .route('/extract/:id')
        .get((req, res) => {
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
                        });
                });
        });
};

module.exports = extractController;