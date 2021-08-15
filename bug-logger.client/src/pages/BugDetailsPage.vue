<template>
  <div class="row justify-content-around">
    <div class="col-md-10">
      <BugDetailCard v-if="bug.id" :bug="bug" />
    </div>
  </div>
  <div class="row justify-content-around">
    <div class="col-md-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await bugsService.getOneById(route.params.bugId)
    })
    return {
      bug: computed(() => AppState.chosenBug)
    }
  }
}
</script>
