const jsdom = require('jsdom');
let {JSDOM} = jsdom;
const _ = require('lodash');

module.exports.fetchPageData = (deviceId, pageId) => {
     return new Promise((resolve, reject) =>{
         resolve(fetchPageDOM(deviceId, pageId));
     })

};

function fetchPageDOM(deviceId, pageId, results = []) {
    //console.log(pageId);
    //console.log('pozdro');
    return JSDOM.fromURL("https://ceneo.pl/" + deviceId + "/opinie-" + pageId).then(dom => {
        let domObject = new JSDOM(dom.serialize());
        // let parsedData = parseData(dom);
        let parsedData = parseDOM(domObject);

        results = results.concat(parsedData);
        let pagePaginationElement = domObject.window.document.getElementsByClassName("pagination");
        let nextPageExist = pagePaginationElement[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0];

        if(nextPageExist) {
            return fetchPageDOM(deviceId, pageId+1, results);
        } else {
            return {
                itemData: prepareItemData(domObject),
                opinions: results
            }


        }
    })
}

function prepareItemData(domObject){
    return {
        type: getType(domObject),
        brand: getBrand(domObject),
        model: getModel(domObject)
    }
}

function getModel(domObject){
    let model = domObject.window.document.getElementsByClassName('product-name')[0].textContent;
    return model.substr(model.indexOf(" ") + 1, model.length);
}

function getType(domObject){
    let spanCollection = domObject.window.document.getElementsByTagName('span');
    let type = "";
    for(let i = 0; i < spanCollection.length; i++){
        if(spanCollection[i].getAttribute('itemprop') === "title"){
            type = spanCollection[i].innerHTML;
        }
    }
    return type;
}

function getBrand(domObject){
    let brand = domObject.window.document.getElementsByClassName('product-name')[0].textContent;
    return brand.substr(0, brand.indexOf(" "));
}

function parseDOM(dom) {
    let opinions = [];
    let allOpinions = dom.window.document.getElementsByClassName("product-review-body");

    for(let opinionObject of allOpinions) {
        opinions.push(opinionObject.textContent);
    }
    return opinions;

}

module.exports.addItem = (item, callback) =>{
    item.save(callback);
};



// const jsdom = require('jsdom');
// let {JSDOM} = jsdom;
//
// module.exports.getAllPages = (deviceId, pageId) => {
//     return new Promise((resolve, reject) =>{
//         let results = [];
//         fetchPageDom(deviceId, pageId, results, fetchPageDom, resolve)
//             .then(function(value){
//                 parseDom(value.domObj, value.results, value.deviceId, value.pageId, value.next, value.finish)
//                     .then(function(value){
//
//                         parseNextPage(value.dom, value.results, value.deviceId, value.pageId, value.next, value.finish)
//                             .then(function(){
//                                 console.log('Promise has been resolved');
//                             })
//                     })
//             })
//
//     })
//
// };
//
// function fetchPageDom(deviceId, pageId, results,  next, finish) {
//         return JSDOM.fromURL("https://ceneo.pl/" + deviceId + "/opinie-" + pageId).then(dom => {
//             let domek = new JSDOM(dom.serialize());
//             let obj = {domek, results, deviceId, pageId, next, finish};
//             // let firstComments = dom.window.document.getElementsByClassName("product-review-body");
//             return obj;
//         });
//
// }
//
// function parseDom(dom, results, deviceId, pageId, next, finish) {
//     console.log(deviceId);
//     return new Promise((resolve) => {
//         let firstComments = dom.window.document.getElementsByClassName("product-review-body");
//         for(let com of firstComments){
//             results.push(com.textContent);
//         }
//
//         let obj = {dom, results, deviceId, pageId, next, finish};
//         resolve(obj)
//     });
// }
//
// function parseNextPage(dom, results, deviceId, pageId, next, finish) {
//     return new Promise(resolve => {
//         console.log('-----------');
//
//         let pagination = dom.window.document.getElementsByClassName("pagination");
//         if (pagination[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0]) {
//
//             next(deviceId, pageId + 1, results,  next, finish);
//         } else {
//             finish(results);
//         }
//         resolve();
//     });
// }

