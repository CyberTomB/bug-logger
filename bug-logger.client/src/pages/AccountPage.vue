<template>
  <div class="row justify-content-center py-4">
    <div class="card text-center" style="width: 18rem;">
      <div class="card-header">
        <img :src="account.picture" class="creator-picture" :alt="account.picture" :title="account.name">
      </div>
      <div class="card-body">
        <h5 class="card-title">
          {{ account.name }}
        </h5>
        <router-link :to="{name: 'Bugs List'}" class="btn btn-primary" title="Bugs List">
          BUGS
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
.creator-picture{

}
</style>
