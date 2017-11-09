const itemsRepository = require('../repositories/items-repository');
const processRepository = require('../repositories/process-repository');
//const {fork} = require('child_process');

let itemsController = function (router, io) {
    router
        .route('/phones/:id')
        .get((req, res) => {
//CALLBACK HELL REFACTOR PLZ
            processRepository.createProcess(555252)
                .then((result) => {
                    processRepository.checkProcessStatus(result, (err, data) => {
                        if (data) {

                            console.log('This process has already been created');
                            res.json('This process already exist');
                        } else {
                            processRepository.addProcess(result, (err, data) => {

                                res.json('Process has been created');
                                itemsRepository.fetchPageData(52408449, 1)
                                    .then((d) => {
                                        processRepository.updateProcess(data, (err, data) => {
                                            console.log(data);

                                        });
                                        io.emit('result', d);
                                    });
                            });

                        }
                    });
                });
        });
};

module.exports = itemsController;