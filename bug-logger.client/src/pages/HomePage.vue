<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <router-link :to="{name: 'Bugs List'}" title="Bugs List">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <img src="../assets/img/code-bug.jpg" class="img-fluid img-home" alt="home image">
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}

.img-home{
  max-height: 100vh;
}
</style>
