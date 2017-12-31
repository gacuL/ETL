import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router';
import Routes from './routes/routes';
import VueSocketio from 'vue-socket.io';
import 'font-awesome/css/font-awesome.css';
Vue.use(VueSocketio, 'http://localhost:8000');
import VueToastr2 from 'vue-toastr-2';
import 'vue-toastr-2/dist/vue-toastr-2.min.css';

Vue.use(VueToastr2);
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
