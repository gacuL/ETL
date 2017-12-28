let tasksRepository = require('../repositories/task-repository');
let itemsRepository = require('../repositories/items-repository');
let transformRepository = require('../repositories/transform-repository');


let transformController = function (router, io) {
    router
        .route('/transform/:id')
        .get((req, res) => {
        let itemId = req.params.id;
        console.log(itemId);
            tasksRepository.readFetchDataFromFile(itemId)
                .then((data)=> transformRepository.transformFetchedData(data))
                .then((data)=> tasksRepository.saveFetchedDataToFile(data, itemId));
         });
};

module.exports = transformController;