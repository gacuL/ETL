const itemsRepository = require('../repositories/items-repository');
const processRepository = require('../repositories/process-repository');
const fs = require('fs');
//const {fork} = require('child_process');

let itemsController = function (router, io) {
    router
        .route('/phones/:id')
        .get((req, res) => {
//CALLBACK HELL REFACTOR PLZ
            let itemId = req.params.id;
            processRepository.checkIfProcessExist(itemId, (err, data) => {
                if (data) {
                    res.status(200).json('This process already exist');
                } else {
                    processRepository.createProcess(itemId)
                        .then((createdProcess) => {
                            processRepository.addProcess(createdProcess, (err, data) => {
                                res.json('Process has just now been created');
                                itemsRepository.fetchPageData(data.processId, 1)
                                    .then((fetchedData) => {
                                        processRepository.updateProcess(data, (err, result) => {
                                            if (err) throw err;
                                            if (result) {
                                                processRepository.saveProcessDataToFile(fetchedData, data.processId);
                                                processRepository.getFinishedProcess(data.processId, (err, finishedProcess) => {
                                                    io.emit('result', finishedProcess);
                                                });

                                            }
                                        });
                                    });
                            });
                        });
                }
            });
        });
};

module.exports = itemsController;