let Process = require('../models/process-model');

module.exports.checkProcessStatus = (proc, callback) => {
    const query = {processId: proc.processId};
    Process.findOne(query, callback);

};

module.exports.addProcess = ((process,callback)=>{
    process.save(callback);
});

module.exports.updateProcess = ((proc, callback)=>{
    const query = {processId: proc.processId};
    let newValue = {pending: false};
    Process.updateOne(query, newValue, callback);
});

module.exports.createProcess = (processId) =>{
    return new Promise((resolve, reject) =>{
       resolve(new Process({
           processId: processId,
           pending: true
       }));
    });
};