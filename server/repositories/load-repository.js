'use strict';

const Item = require('../models/item-model');

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