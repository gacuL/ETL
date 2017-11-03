const itemsRepository = require('../repositories/items-repository');
const Item  = require('../models/item-model');

let itemsController = function(router, id){
        router
            .route('/phones/:id')
            .get((req, res) =>{
            //res.send('test');

                    //26675447
                 itemsRepository.fetchPageData(52408449, 1)
                     .then(function(result){

                         // let newItem = new Item({
                         //     name: result.name,
                         // });

                       console.log(result.opinions[7]);


                         // itemsRepository.addItem(newItem, (err, item)=>{
                         //    if(err){
                         //        console.log(err);
                         //    } else {
                         //        console.log(item);
                         //    }
                         // });
                         // console.log('this is process id', id);
                         // console.log(result.opinions[0][0].textContent);
                         if(!result){
                             res.json('hello world', id);
                         } else {
                            res.json('finished');
                         }

                     })



               // res.send('witam');
               // for(let i = 0; i < 500000; i++){
               //     console.log('waiting...' + i);
               //  }
                // function getAllPages(deviceId, pageId){
                //     JSDOM.fromURL("https://ceneo.pl/" + deviceId + "/opinie-" + pageId).then(dom => {
                //         console.log(pageId);
                //         //"product-review-body"
                //         // console.log(dom.window.document.querySelector("p").textContent);
                //         let domObject = new JSDOM(dom.serialize());
                //         let firstComments = domObject.window.document.getElementsByClassName("product-review-body");
                //         console.log(firstComments[0].textContent);
                //         let pagination = domObject.window.document.getElementsByClassName("pagination");
                //         // for(let i = 0; i < 10; i ++){
                //         //     if(yy[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0].className){
                //         //         console.log('yeah');
                //         //     } else {
                //         //         console.log('no');
                //         //     }
                //         // }
                //         //console.log(pagination[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0].className);
                //         if(pagination[0].lastElementChild.getElementsByClassName("page-arrow arrow-next")[0].className){
                //            getAllPages(deviceId, pageId+1);
                //         } else {
                //             return 'nice';
                //         }
                //         // arr.push(yy[0].lastElementChild.textContent);
                //         // console.log(arr);
                //     });
                // }
                //
                // getAllPages(36505455, 1);
            });
};

module.exports = itemsController;