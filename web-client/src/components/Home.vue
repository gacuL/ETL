<template>
  <div>
    <h1>Home component</h1>
    <div class="container-fluid">
      <div class="row">
        <!--<div v-if="loading" class="loading-spinner">-->
          <!--<i class="fa fa-spinner fa-spin fa-lg"></i>-->
        <!--</div>-->

        <div class="col-md-4">
          <div class="list-group" v-for="item in items">
            <a href="#" class="list-group-item list-group-item-action" v-bind:value="item"
               @click="selectItem(item)">{{item.model}}</a>
          </div>
        </div>
        <div class="col-md-8">
          <div class="list-group" v-for="review in selectedItem.reviews">
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start custom-margin">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{review.reviewerName}}</h5>
                <small>{{review.reviewDate}}</small>
              </div>
              <small>{{review.stars}}</small>
              <p class="mb-1">{{review.reviewContent}}</p>
              <button class="btn btn-primary" @click="exportToCSV(review)">Export to csv</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import itemsService from '../services/items-service';
 var json2csv = require('json2csv');
 let fs = require('file-saver');

  export default {

    data() {
      return {
        property: "",
        selectedItem: "",
        items: [],
        loading: false
      }
    },
    methods: {
      selectItem(data) {
        this.selectedItem = data;
        console.log(this.selectedItem);
      },
      exportToCSV(data) {
        try {
          let fields = ["reviewContent", "reviewDate", "reviewerName", "stars"];
          let r = json2csv({data: data}, {fields: fields});
          let blob = new Blob([r], {type: "text/csv;charset=utf-8"});
          fs.saveAs(blob, `${data._id}_comment.csv`);
        } catch (err) {
          // Errors are thrown for bad options, or if the data is empty and no fields are provided.
          // Be sure to provide fields if it is possible that your data array will be empty.
          console.error(err);
        }
      }
    },

    created() {
      this.loading = true;
      itemsService.get()
        .then((result) => {
          this.items = result.data;
          console.log('aaaaa', result.data[0].reviews);

          this.loading = false;
        });
      this.property = 'Example property update.';
      console.log('propertyComputed will update, as this.property is now reactive.')
    }
  }
</script>

<style scoped>
  .custom-margin {
    margin-bottom: 10px;
  }

  .loading-spinner {
    margin: auto;
  }
</style>
