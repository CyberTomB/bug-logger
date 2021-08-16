<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <router-link :to="{name: 'Bugs List'}" title="Bugs List">
      <div class="row justify-content-center">
        <div class="col-md-10 text-center bg-home d-flex h-75 align-items-center">
          <h1 class="home-link">
            Bugsville
          </h1>
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
.bg-home {
  background-image: url('../assets/img/code-bug.jpg');
    -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 80vh;
  min-width: 80vw;
}

.home-link{
  margin: auto;
  color: var(--light);
  font-size: 78px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-shadow: 1px 1px 2px black
}

</style>
