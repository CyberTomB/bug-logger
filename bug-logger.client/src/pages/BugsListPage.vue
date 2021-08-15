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
        <h3 class="col" @click="openFilter">
          {{ state.openBugsOnly ? 'All Bugs' : 'Open Only' }}
        </h3>
      </div>
      <div v-if="state.openBugsOnly">
        <BugListCard v-for="(bug, i) in openBugs"
                     :key="bug.id"
                     :bug="bug"
                     :index="i"
        />
      </div>
      <div v-else>
        <BugListCard v-for="(bug, i) in bugs" :key="bug.id" :bug="bug" :index="i" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
export default {
  setup() {
    const state = reactive({
      openBugsOnly: false
    })
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      openBugs: computed(() => AppState.bugs.filter(b => b.closed !== true)),
      openFilter() {
        state.openBugsOnly = !state.openBugsOnly
      }
    }
  }
}
</script>
