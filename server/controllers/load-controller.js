let tasksRepository = require('../repositories/task-repository');
let itemsRepository = require('../repositories/items-repository');

let loadController = function (router, io) {
    router
        .route('/load/:id')
        .get((req, res) => {
            let itemId = req.params.id;
            // console.log(itemId);
            // let itemId = 32592506;

                    res.json('loading process has now been started');
                    tasksRepository.readFetchDataFromFile(itemId)
                        .then((fetchedData) => itemsRepository.addItem(fetchedData))
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
                                    // io.emit('result', obj);
                                    console.log(obj);
                                    req.socket.end();
                                });
                        })
                        .catch((err)=>{
                            console.log('Error wyjebalo', err);
                        });
                })

};

module.exports = loadController;