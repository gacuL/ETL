'use strict';

const Item = require('../models/item-model');
let Task = require('../models/task-model');
let fs = require('fs');

module.exports.saveItemToDb = (itemData) => {
    itemData = JSON.parse(itemData);
    return new Promise((resolve, reject) => {
        let newItem = new Item({
            type: itemData.type,
            brand: itemData.brand,
            model: itemData.model,
            numOfPages: itemData.numOfPages,
            id: itemData.id,
            reviews: getReviews(itemData.opinions)
        });

        newItem.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
};

function getReviews(reviews) {

    return reviews.map((review) => {
        return {
            reviewContent: review.reviewContent,
            stars: review.stars,
            reviewerName: review.reviewerName,
            reviewDate: review.reviewDate
        }
    });
}

module.exports.removeFile = (id) => {
    fs.unlink(__dirname + '/../fetched-data/' + id + '.json', function(error) {
        if (error) {
            throw error;
        }
       console.log('file has been deleted');
    });
}

module.exports.updateTaskStatus = (taskId, savedToDB = false) => {
    return new Promise((resolve, reject) => {
        const query = {id: taskId};
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

module.exports.getItemById = (itemId) => {
    return new Promise((resolve, reject) => {
        const query = {
            id: itemId
        };

        Item.findOne(query)
            .then((result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject("No item found");
                }
            })
    });
};