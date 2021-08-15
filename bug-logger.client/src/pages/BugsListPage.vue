<template>
  <div class="row justify-content-around">
    <div class="col-md-10">
      <div class="row">
        <h3 class="col-3">
          Title
        </h3>
        <h3 class="col-3">
          Created By
        </h3>
        <h3 class="col-3">
          Last Updated
        </h3>
        <h3 class="col">
          Closed
        </h3>
      </div>
      <BugListCard v-for="(bug, i) in bugs" :key="bug.id" :bug="bug" :index="i" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
export default {
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>
