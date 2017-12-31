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
      <div class="card custom-col">
        <div class="card-header">
          Wyniki
        </div>
        <div v-if="loading" class="loading-spinner">
          <i class="fa fa-spinner fa-spin fa-lg"></i>
        </div>
        <div v-else="!loading">
          <div v-if="socketData.errorInfo" class="card-body">
            <p><strong>Id produktu:</strong> {{socketData.result.id}}</p>
            <p><strong>Data dodania produktu:</strong> {{socketData.result.date}}</p>
            <p><strong>Status: </strong>Produkt juz znajduje sie w bazie danych</p>
            <button @click="updateData" class="btn btn-primary">Kliknij aby odświeżyć dane</button>
          </div>

          <div v-if="socketData.model" class="card-body">
            <p><strong>Id produktu:</strong>{{socketData.id}}</p>
            <p><strong>Model produktu:</strong> {{socketData.model}}</p>
            <p><strong>Data dodania: </strong>{{socketData.date}}</p>
            <p><strong>Liczba stron komentarzy:</strong> {{socketData.pages}}</p>
          </div>
        </div>
        <div class="no-result-info" v-if="!socketData">
          Brak wynikow
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemsService from "../services/items-service";
import socket from 'socket.io-client';

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

  .loading-spinner {
    margin: auto;
  }

  .custom-col {
    height: 100%;
  }

  .no-result-info {
    margin: auto;
  }
</style>
