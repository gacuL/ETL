<template>
  <div>
    <h1>Home component</h1>
    <div class="container-fluid">
      <div class="row">
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

            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import itemsService from '../services/items-service';
  export default {

    data () {
      return {
        property: "",
        selectedItem: "",
        items: []
      }
    },
    methods: {
      selectItem(data) {
        this.selectedItem = data;
        console.log(this.selectedItem);
      }
    },

    created() {
      itemsService.get()
        .then((result)=>{
        this.items = result.data;
        });
      this.property = 'Example property update.';
      console.log('propertyComputed will update, as this.property is now reactive.')
    }
  }
</script>

<style scoped>
.custom-margin{
  margin-bottom:10px;
}
</style>
