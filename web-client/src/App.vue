<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
    <!--<app-etl v-bind:ninjas="ninjas"></app-etl>-->
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
      ninjas: [
        {name: "Pitro", speciality: "Killing", show: false},
        {name: "Pitro", speciality: "Killing", show: false},
        {name: "Pitro", speciality: "Killing", show: false},
        {name: "Pitro", speciality: "Killing", show: false},
        {name: "Pitro", speciality: "Killing", show: false}
      ]
    }
  }
}
</script>

<style>
  body {
    background-color: #ccc;
  }
</style>
