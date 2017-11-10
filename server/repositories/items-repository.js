'use strict';

const jsdom = require('jsdom');
let {JSDOM} = jsdom;
const url = "https://ceneo.pl/";


module.exports.fetchPageData = (deviceId, pageId) => {

    return new Promise((resolve, reject) => {
        resolve(fetchPageDOM(deviceId, pageId));
    })

};


function fetchPageDOM(deviceId, pageId, opinions = []) {
    console.log(pageId);
    return JSDOM.fromURL(url + deviceId + "/opinie-" + pageId).then(dom => {
        let domObject = new JSDOM(dom.serialize());
        return prepareOpinionsData(domObject, opinions, deviceId, pageId)
            .then(result => concatOpinions(result))
            .then(result => nextPageExist(result))
            .then(result => fetchPageDOM(result.deviceId, result.pageId + 1, result.opinions))
            .catch((result) => prepareItemData(result.dom, result.opinions))
    })
}

function nextPageExist(result) {
    return new Promise((resolve, reject) => {

        let pagePaginationElement = result.dom.window.document.getElementsByClassName("pagination");
            let nextPageExist = pagePaginationElement[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0];
            if (nextPageExist) {
                resolve({nextPageExist: nextPageExist, dom: result.dom,
                    opinions: result.opinions, deviceId: result.deviceId, pageId: result.pageId});
            } else {
                reject({dom: result.dom, opinions: result.opinions});
            }
    })
}


function concatOpinions(result) {
    return new Promise((resolve) => {
        result.opinions = result.opinions.concat(result.localOpinions);
        resolve({opinions: result.opinions, dom: result.dom, deviceId: result.deviceId, pageId: result.pageId});
    })
}

function prepareItemData(domObject, opinions) {
    return new Promise((resolve, reject) => {
        resolve({
            type: getType(domObject),
            brand: getBrand(domObject),
            model: getModel(domObject),
            opinions: opinions
        });
    })
}

function getModel(domObject) {
    let model = domObject.window.document.getElementsByClassName('product-name')[0].textContent;
    return model.substr(model.indexOf(" ") + 1, model.length);
}

function getType(domObject) {
    let spanCollection = domObject.window.document.getElementsByTagName('span');
    let type = "";
    Array.prototype.map.call(spanCollection, (elem) => {
        return elem.getAttribute('itemProp') === 'title' ? type = elem.innerHTML : '';
    });

    return type;
}

function getBrand(domObject) {
    let brand = domObject.window.document.getElementsByClassName('product-name')[0].textContent;
    return brand.substr(0, brand.indexOf(" "));
}

function prepareOpinionsData(dom, opinions, deviceId, pageId) {
    return new Promise((resolve, reject) => {
        let localOpinions = [];
        let allOpinions = dom.window.document.getElementsByClassName("product-review-body");

        Array.prototype.map.call(allOpinions, (opinion) => {
            let changedText = opinion.textContent.replace(/\s\s+/g, ' ');
            return localOpinions.push(changedText);
        });
        resolve({opinions, localOpinions, dom, deviceId, pageId});
    });
}

module.exports.addItem = (item, callback) => {
    item.save(callback);
};
