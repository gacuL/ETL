'use strict';

module.exports.transformFetchedData = function(data) {
    let d = JSON.parse(data);
    console.log(d.opinions);
   return new Promise((resolve, reject)=>{
       for(let opinion of d.opinions){
           opinion.reviewerName = opinion.reviewerName.replace(/[\n\t\s]+/g, "");
           opinion.reviewContent = opinion.reviewContent.replace(/[\n\t]+/g, "");
       }
       resolve(d);
   })
};