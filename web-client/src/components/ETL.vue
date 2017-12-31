<template>
  <div class="container margin_top">
    <ul class="nav nav-pills">
      <router-link class="nav-link" :to="{name:'singleStep'}" tab="li" active-class="active" exact>
      <a>ETL - cały proces</a>
    </router-link>
      <router-link class="nav-link" :to="{name:'threeSteps'}" tab="li" active-class="active" exact>
        <a>ETL - 3 kroki</a>
      </router-link>
    </ul>

    <hr>
    <router-view></router-view>
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
