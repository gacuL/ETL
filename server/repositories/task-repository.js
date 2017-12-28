let Task = require('../models/task-model');
let fs = require('fs');


module.exports.checkProcessStatus = (proc, callback) => {
    const query = {id: proc.id};
    Task.findOne(query, callback);
};

module.exports.saveTask = (task) => {
    return new Promise((resolve, reject) => {
        task.save((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports.updateTaskStatus = (task, savedToDB = false) => {
    return new Promise((resolve, reject) => {
        const query = {id: task.id};
        let newValue = {pending: false, savedToDb: savedToDB};
        Task.updateOne(query, newValue, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('aaaaa', newValue);
                resolve(newValue);
            }
        })
    });
};

module.exports.createTask = (id) => {
    return new Promise((resolve) => {
        resolve(new Task({
            id: id,
            pending: true,
            savedToDb: false
        }));
    });
};

module.exports.updateTaskDate = (id) => {
    return new Promise((resolve, reject) => {
        const query = {id: id};
        let newValue = {date: new Date()};
        Task.updateOne(query, newValue, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('aaaaa', newValue);
                resolve(newValue);
            }
        })
    })
};

module.exports.saveFetchedDataToFile = (data, id) => {
    return new Promise((resolve, reject) => {
        let json = JSON.stringify(data);
        fs.writeFile(__dirname + '/../fetched-data/' + id + '.json', json, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(json)
            }
        });
    });
};

module.exports.saveF = (data, id) => {
    return new Promise((resolve, reject) => {
        let json = JSON.stringify(data);
        fs.writeFile(__dirname + '/../extracted-data/' + id + '.txt', json, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(json)
            }
        });
    });
};

module.exports.readFetchDataFromFile = (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/../fetched-data/' + id + '.json', 'utf8',(err, data) =>{
            if (err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
};

module.exports.checkIfTaskExist = (id) => {
    return new Promise((resolve, reject) => {
        const query = {id: id};
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
    return new Promise((resolve, reject) => {
        const query = {id: id};
        Task.findOne(query, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports.getAllFinishedTasks = () => {
    return new Promise((resolve, reject) => {
        const query = {pending: false, savedToDb: false};
        Task.find(query, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
};

module.exports.getTaskById = (id) => {
    return new Promise((resolve, reject) => {
        const query = {id: id, savedToDb: true};
        Task.findOne(query)
            .then((result) => {
                if (result) {
                    reject({errorInfo: "This item is already in database", result});
                } else {
                    resolve(result);
                }
            })
    });
};