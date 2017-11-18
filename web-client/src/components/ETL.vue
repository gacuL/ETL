<template>
  <div class="container margin_top">
    <nav class="nav nav-tabs" id="myTab" role="tablist">
      <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" role="tab" aria-controls="nav-home"
         aria-selected="true">
        <router-link
          :to="{name: 'single-step'}">ETL - single step process
        </router-link>
      </a>
      <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" role="tab" aria-controls="nav-profile"
         aria-selected="false">
        <router-link
          :to="{name: 'three-steps'}">ETL - three steps process
        </router-link>
      </a>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import itemsService from '../services/items-service';
  export default {
    data () {
      return {
        productId: 'abc'
      }
    },
    methods: {

    },
    created() {

    }
  }
</script>

<style scoped>
  .margin_top {
    margin-top: 50px;
  }
</style>
