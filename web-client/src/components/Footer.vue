<template>
  <footer>
    <p>{{copyright}}</p>
  </footer>

</template>

<script>

  export default {

    data () {
      return {
        copyright: 'Copyright 2017 Piotr Bieniek'
      }
    }
  }
</script>

<style scoped>
  footer{
    background: #222;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 6px;

    text-align: center;

  }

  p {
    color: lightgreen;
  }

</style>
