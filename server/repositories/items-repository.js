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
            .catch((result) => prepareItemData(result));
    })
}

function nextPageExist(result) {
    return new Promise((resolve, reject) => {

        let pagePaginationElement = result.dom.window.document.getElementsByClassName("pagination");
             let nextPageExist = pagePaginationElement[0].lastElementChild.getElementsByClassName("page-arrow arrow-next");
        console.log('nextpageexist');
            if ( pagePaginationElement.length > 0 && nextPageExist.length > 0) {
                console.log('next page exist');
                resolve({nextPageExist: nextPageExist, dom: result.dom,
                    opinions: result.opinions, deviceId: result.deviceId, pageId: result.pageId});
            } else {
                console.log('next page does not exist');
                console.log(result.opinions);
                reject({dom: result.dom, opinions: result.opinions});
            }
    })
}


function concatOpinions(result) {
    return new Promise((resolve) => {
        result.opinions = result.opinions.concat(result.localOpinions);
        console.log('concat',result.opinions);
        resolve({opinions: result.opinions, dom: result.dom, deviceId: result.deviceId, pageId: result.pageId});
    })
}

function prepareItemData(result) {
    console.log('aaaa', result.opinions);
    return new Promise((resolve, reject) => {
        // resolve({
        //     type: getType(domObject),
        //     brand: getBrand(domObject),
        //     model: getModel(domObject),
        //     opinions: opinions
        // });
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
        console.log('opinions data');
        resolve({opinions, localOpinions, dom, deviceId, pageId});
    });
    // return new Promise((resolve, reject) => {
    //     let localOpinions = [];
    //     let opinions1 = [];
    //     let allOpinions = dom.window.document.getElementsByClassName("product-review-body");
    //     let stars = dom.window.document.getElementsByClassName("review-score-count");
    //         let localOpinion = {};
    //     for(let i = 0; i < allOpinions.length;i +=1){
    //
    //         let opinionContent = allOpinions[i].textContent;
    //         let opinionStars = stars[i].innerHTML;
    //         localOpinion = {
    //             content: opinionContent,
    //             stars: opinionStars
    //         };
    //         opinions1.push(localOpinion);
    //         // console.log('wow', stars[i].textContent);
    //     }
    //     // console.log('hahafaf',opinions1[0]);
    //
    //     // Array.prototype.map.call(allOpinions, (opinion) => {
    //     //
    //     //     let changedText = opinion.textContent.replace(/\s\s+/g, ' ');
    //     //     return localOpinions.push(changedText);
    //     // });
    //     resolve({opinions, opinions1, dom, deviceId, pageId});
    //
    // });
}

module.exports.addItem = (item, callback) => {
    item.save(callback);
};
