import Api from './api';

export default {
  get(){
    return Api().get('/items');
  }
}
