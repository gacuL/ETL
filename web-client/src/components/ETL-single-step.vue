<template>
  <div class="col-md-6 col-margin-top">
    <div class="card">
      <div class="card-header">single step</div>
    <div class="card-body">
      <form action="">
        <div class="form-group">
          <label for="productIDInput">Product id</label>
          <input
            class="form-control"
            name="product-id"
            id="productIDInput"
            v-model="productId"
            placeholder="Enter product id...">
        </div>
        <button @click="fetchData" class="btn btn-primary">ETL</button>
      </form>
    </div>
    </div>

  </div>

</template>

<script>
  import itemsService from '../services/items-service';
  export default {

    data () {
      return {
        productId: ''
      }
    },
    methods: {
      fetchData() {
        itemsService.get()
          .then((result)=>{
            console.log(result);
          })
      }
    }
  }
</script>

<style scoped>
  .col-margin-top {
    margin-top: 20px;
  }
</style>
