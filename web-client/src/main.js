import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router';
import Routes from './routes/routes';


Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
});




new Vue({
  el: '#app',
  render: h => h(App),
  router: router
});
