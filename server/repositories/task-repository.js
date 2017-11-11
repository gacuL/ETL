let Task = require('../models/task-model');
let fs = require('fs');


module.exports.checkProcessStatus = (proc, callback) => {
        const query = {processId: proc.processId};
    Task.findOne(query, callback);
};

module.exports.saveTask = (task)=> {
    return new Promise((resolve, reject) => {
        task.save((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports.updateTaskStatus = (proc)=>{
    return new Promise((resolve, reject)=>{
        const query = {processId: proc.processId};
        let newValue = {pending: false};
        Task.updateOne(query, newValue, (err)=>{
            if (err){
                reject(err);
            } else {
                console.log('aaaaa', newValue);
                resolve(newValue);
            }
        })
    });
};

module.exports.createTask = (processId) =>{
    return new Promise((resolve) =>{
       resolve(new Task({
           processId: processId,
           pending: true,
           savedToDb: false
       }));
    });
};

module.exports.saveFetchedDataToFile = (data, processId) =>{
    return new Promise((resolve, reject)=>{
        let json = JSON.stringify(data);
        fs.writeFile(__dirname + '/../fetched-data/' + processId + '.json', json, 'utf8', (err)=>{
            if(err){
                reject('errr', err);
            } else {
                resolve(json)
            }
        });
    });
};

module.exports.checkIfTaskExist = (id) => {
    return new Promise((resolve, reject) => {
        const query = {processId: id};
        Task.findOne(query)
            .then((result) => {
                if (result) {
                    reject("This process already exist");
                } else {
                    resolve(result);
                }
            })
    });
};

module.exports.getFinishedTask = (id) => {
    return new Promise((resolve, reject)=>{
        const query = {processId: id};
        Task.findOne(query, (err, data)=>{
            if (err){
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports.getAllFinishedTasks = () => {
    return new Promise((resolve, reject)=>{
        const query = {pending: false, savedToDb: false};
        Task.find(query, (err,data)=>{
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
};