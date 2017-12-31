<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
    <!--<app-footer></app-footer>-->
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import ETL from './components/ETL.vue'
  import Home from './components/Home.vue';
  import ETLSingleStep from './components/ETL-single-step.vue';
  import ETLThreeSteps from './components/ETL-three-steps.vue';


export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
    "app-etl": ETL,
    "app-home": Home,
    "etl-single-step": ETLSingleStep,
    "etl-three-steps": ETLThreeSteps
  },
  data () {
    return {
    }
  }
}
</script>

<style>
  body {
    background-color: #f5f5f5;
  }

  .btn {
    border-radius: 0;
  }

</style>
