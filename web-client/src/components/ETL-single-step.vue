<template>
  <div class="row">
    <div class="col-md-4 col-margin-top">
      <div class="card">
        <div class="card-header">ETL (cały proces)</div>
        <div class="card-body">
          <form action="">
            <div class="form-group">
              <label for="productIDInput">ID produktu:</label>
              <input
                class="form-control"
                name="product-id"
                id="productIDInput"
                v-model="productId"
                placeholder="Enter product id...">
            </div>
            <button @click="fetchData" class="btn btn-primary">Rozpocznij proces ETL</button>
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-8 col-margin-top">
      <div class="card">
        <div class="card-header">
          Wyniki
        </div>
        <div v-if="loading">
          <span>loading...</span>
        </div>
        <div v-else="!loading">
          <div v-if="socketData.errorInfo" class="card-body">
            <p>Id produktu: {{socketData.result.id}}</p>
            <p>Data dodania produktu: {{socketData.result.date}}</p>
            <p>Status: {{socketData.errorInfo}}</p>
            <button @click="updateData" class="btn btn-primary">Kliknij aby odświeżyć dane</button>
          </div>

          <div v-if="socketData.model" class="card-body">
            <p>Id produktu: {{socketData.id}}</p>
            <p>Model produktu: {{socketData.model}}</p>
            <p>Data dodania: {{socketData.date}}</p>
            <p>Liczba stron komentarzy: {{socketData.pages}}</p>
          </div>
          <div v-if="!socketData">
            Brak wynikow
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemsService from "../services/items-service";

export default {
  data() {
    return {
      productId: "",
      result: "",
      loading: false,
      socketData: ""
    };
  },
  methods: {
    fetchData(event) {
      event.preventDefault();
      this.loading = true;
      itemsService.get(this.productId).then(result => {
        console.log(result);
        this.result = result.data;
      });
    },
    updateData(event) {
      this.loading = true;
      event.preventDefault();
      itemsService.post(this.productId).then(result => {
        console.log(result);
        this.result = result.data;
      });
    }
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    result: function(data) {
      console.log(data);
      this.socketData = data;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.col-margin-top {
  margin-top: 20px;
}
</style>
