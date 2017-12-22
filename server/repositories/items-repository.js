'use strict';

const Item = require('../models/item-model');


function getReviews(reviews) {
    let reviewsArray = reviews.map((review) => {
        return {
            reviewContent: review.reviewContent,
            stars: review.stars,
            reviewerName: review.reviewerName,
            reviewDate: review.reviewDate
        }
    });
    return reviewsArray;
}

module.exports.addItem = (itemData) => {
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

module.exports.updateItem = (itemData) => {
    return new Promise((resolve, reject) => {
        const query = {id: itemData.id};
        let newValue = {
            numOfPages: itemData.numOfPages,
            reviews: getReviews(itemData.opinions)
        };
        Item.updateOne(query, newValue, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(newValue);
            }
        });
    });
};


module.exports.getItemById = (item) => {
    console.log(item);
    return new Promise((resolve, reject) => {
        const query = {
            id: item.processId
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