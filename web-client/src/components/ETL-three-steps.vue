<template>
  <div class="row">
    <div class="col-md-4 col-margin-top">
      <div class="card main-card">
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

            <button @click="extractData" class="btn btn-primary">E</button>
            <button :disabled="!extractedData" @click="transformData" class="btn btn-primary">T</button>
            <button :disabled="!transformedData" @click="loadData" class="btn btn-primary">L</button>

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
        <div class="no-result-info" v-if="!loading && !extractedData && !transformedData && !loadedData && !errorExtractedData">
          Brak wynikow
        </div>
        <div class="card card-margin" v-if="extractedData">
          <h4 class="h4-position">Extract:</h4>
          <ul class="list-group custom-list">
            <li class="list-group-item"><Strong>Id produktu: </Strong>{{extractedData.id}}</li>
            <li class="list-group-item"><strong>Model produktu: </strong>{{extractedData.model}}</li>
            <li class="list-group-item"><strong>Liczba stron komentarzy: </strong>{{extractedData.numOfPages}}</li>
            <li class="list-group-item"><strong>libcza komentarzy: </strong>{{extractedData.opinions}}</li>
          </ul>

        </div>
        <div class="card card-margin" v-if="transformedData">
          <h4 class="h4-position">Transform:</h4>
          <ul class="list-group custom-list">
            <li class="list-group-item"><Strong>Id produktu: </Strong>{{transformedData.id}}</li>
            <li class="list-group-item"><Strong>Status: </Strong>Dane zostaly oczyszczone</li>
          </ul>

        </div>
        <div class="card card-margin" v-if="loadedData">
          <h4 class="h4-position">Load:</h4>
          <ul class="list-group custom-list">
            <li class="list-group-item"><Strong>Id produktu: </Strong>{{loadedData.id}}</li>
            <li class="list-group-item"><Strong>Model produktu: </Strong>{{loadedData.model}}</li>
            <li class="list-group-item"><Strong>Data dodania produktu: </Strong>{{loadedData.date}}</li>
            <li class="list-group-item"><Strong>Liczba stron komentarzy: </Strong>{{loadedData.pages}}</li>
          </ul>
        </div>

        <div class="card card-margin" v-if="errorExtractedData">
          <h4 class="h4-position">Ten przedmiot jets juz w bazie danych!:</h4>
          <ul class="list-group custom-list">
            <li class="list-group-item"><Strong>Id produktu: </Strong>{{errorExtractedData.result.id}}</li>
            <li class="list-group-item"><Strong>Data dodania produkut: </Strong>{{errorExtractedData.result.date}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import extractService from '../services/extract-service';
  import transformService from '../services/transfrom-service';
  import loadService from '../services/load-service';

  export default {

    data() {
      return {
        productId: "",
        extractedData: "",
        socketData: "",
        loadedData: "",
        loading: false,
        transformedData: "",
        errorExtractedData: ""
      }
    },

    methods: {
      extractData(event) {
        event.preventDefault();
        this.errorExtractedData = "";
        if(this.extractedData || this.transformedData || this.loadedData){
          this.extractedData = "";
          this.transformedData = "";
          this.loadedData = "";
        }
        this.loading = true;
        extractService.get(this.productId)
          .then((result) => {
          })
          .catch((err) => {
            console.log('inside catch', err);
          })
      },
      transformData(event) {
        event.preventDefault();
        this.loading = true;
        transformService.get(this.extractedData.id)
          .then(result => {
            console.log(result);
            this.transformedData = result.data;
            this.loading = false;
          })
          .catch((err) => {
            console.log('weszlo do catcha');
            this.$toastr.error('Operacja niedozwolona');
          })
      },
      loadData(event) {
        event.preventDefault();

        this.loading = true;
        loadService.get(this.transformedData.id)
          .then(result => {
            this.loadedData = result.data;
            this.loading = false;
          })
          .catch((err) => {
            this.$toastr.error('Operacja niedozwolona');
          });
      }
    },

    sockets: {
      connect: function () {
        console.log("socket connected");

      },
      connect_error: function (err) {
        console.log('connet error', err);
      },

//      disconnect: function() {
//        console.log('user disconnected');
//      },
      extractedData: function (data) {
        this.extractedData = data;
        console.log(this.extractedData);
        this.loading = false;
      },
      errorExctractedData: function (data) {
        console.log(data);
        this.errorExtractedData = data;
        this.loading = false;
      }
    }
  }
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
    margin-bottom: 20px;
  }

  .no-result-info {
    margin: auto;
  }

  .card-margin {
    margin: 10px;
  }

  .custom-list {
    margin: 10px;
  }

  .h4-position {
    margin: 10px;
  }


</style>
