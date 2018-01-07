import Api from './api';

export default {
  get (id) {
    return Api().get('/entire-process/' + id);
  },

  post(id) {
    return Api().post('/entire-process/' + id)
  }
}
