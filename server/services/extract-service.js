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
            .catch((result) => prepareItemData(result, pageId, deviceId));
    })
}

function nextPageExist(result) {
    return new Promise((resolve, reject) => {
        const pagePaginationElement = result.dom.window.document.getElementsByClassName("pagination");
        if ( pagePaginationElement.length > 0 && pagePaginationElement[0].lastElementChild.getElementsByClassName("page-arrow arrow-next").length > 0) {
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

function prepareItemData(result, pagesNumber, deviceId) {
    console.log(result);
    return new Promise((resolve, reject) => {
        resolve({
            type: getType(result.dom),
            brand: getBrand(result.dom),
            model: getModel(result.dom),
            numOfPages: pagesNumber,
            id: deviceId,
            opinions: result.opinions
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
        let productsReviews = dom.window.document.querySelector(".product-reviews").getElementsByClassName("review-box");
        Array.prototype.map.call(productsReviews, (productReview)=>{

            let reviewContent = productReview.getElementsByClassName("product-review-body")[0].textContent;
            let stars = productReview.getElementsByClassName("review-score-count")[0].textContent;
            let reviewerName = productReview.getElementsByClassName("reviewer-name-line")[0].textContent;
            let reviewDate = productReview.getElementsByTagName("time")[0].getAttribute("datetime");
            // let formattedReviewerName = reviewerName.replace(/[\n\t\s]+/g, "");
            // let formattedReviewContent  = reviewContent.replace(/[\n\t]+/g, "");

            return localOpinions.push({reviewContent: reviewContent, stars: stars,
                reviewerName: reviewerName, reviewDate: reviewDate});


        });
        resolve({opinions, localOpinions, dom, deviceId, pageId});
    });
}