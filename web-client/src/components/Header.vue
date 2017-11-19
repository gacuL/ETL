<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">ETL project</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link"><router-link to="/">Home</router-link><span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/etl">ETL</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">fetch and show data</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

</template>

<script>

  export default {

    data () {
      return {
        title:"ETL"
      }
    }
  }
</script>

<style scoped>

  a {
    color: white;
  }

</style>
