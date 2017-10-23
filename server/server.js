const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, '../web-client');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let arr = [];

function getAllPages(id) {
    JSDOM.fromURL("https://ceneo.pl/36505455/opinie-" + id).then(dom => {
        console.log(id);
        //"product-review-body"
        // console.log(dom.window.document.querySelector("p").textContent);
        let domObject = new JSDOM(dom.serialize());
        let pagination = domObject.window.document.getElementsByClassName("pagination");
        // for(let i = 0; i < 10; i ++){
        //     if(yy[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0].className){
        //         console.log('yeah');
        //     } else {
        //         console.log('no');
        //     }
        // }
        console.log(pagination[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0].className);
        if(pagination[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0].className){
            getAllPages(id+1);
        } else {
            console.log('juz koniec');
        }
        // arr.push(yy[0].lastElementChild.textContent);
        // console.log(arr);

    });
}

getAllPages(1);


app.use(express.static(publicPath));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});