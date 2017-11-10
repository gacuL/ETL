let Process = require('../models/process-model');
let fs = require('fs');


module.exports.checkProcessStatus = (proc, callback) => {
    const query = {processId: proc.processId};
    Process.findOne(query, callback);

};

module.exports.addProcess = (process,callback)=>{
    process.save(callback);
};

module.exports.updateProcess = (proc, callback)=>{
    const query = {processId: proc.processId};
    let newValue = {pending: false};
    Process.updateOne(query, newValue, callback);
};

module.exports.createProcess = (processId) =>{
    return new Promise((resolve, reject) =>{
       resolve(new Process({
           processId: processId,
           pending: true,
           savedToDb: false
       }));
    });
};

module.exports.saveProcessDataToFile = (data, processId) =>{
    let json = JSON.stringify(data);
    fs.writeFile(__dirname + '/../fetched-data/' + processId + '.json', json, 'utf8');
};

module.exports.checkIfProcessExist = (id, callback) =>{
    const query = {processId: id};
    Process.findOne(query, callback);
};

module.exports.getFinishedProcess = (id, callback) => {
    const query = {processId: id};
    Process.findOne(query, callback);
};