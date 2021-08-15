<template>
  <BugCreateModal />
  <div class="row justify-content-around">
    <div class="col-md-10">
      <div class="row justify-content-end py-3">
        <div class="col-6">
          <h2>Bugs Reported:</h2>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <!-- Bug Create Modal: -->
          <button type="button" class="btn btn-info" data-toggle="modal" data-target="#createBugReport" title="Create Bug Report">
            Create Bug Report
          </button>
        </div>
      </div>
      <div class="row">
        <h3 class="col-3">
          Title
        </h3>
        <h3 class="col-3">
          Created By
        </h3>
        <h3 class="col-3" @click="updateOrder">
          Last Updated
        </h3>
        <h3 class="col" @click="openFilter">
          {{ state.openBugsOnly ? 'Open Only' : 'All Bugs' }}
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
      openBugsOnly: false,
      newestBugsFirst: true
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
      bugsNewestFirst: computed(() => AppState.bugs.sort(function(x, y) {
        const xDate = new Date(x.updatedAt)
        const yDate = new Date(y.updatedAt)
        return yDate - xDate
      })),
      bugsOldestFirst: computed(() => AppState.bugs.sort(function(x, y) {
        const xDate = new Date(x.updatedAt)
        const yDate = new Date(y.updatedAt)
        return xDate - yDate
      })),
      openBugs: computed(() => AppState.bugs.filter(b => b.closed !== true)),
      openFilter() {
        state.openBugsOnly = !state.openBugsOnly
      },
      updateOrder() {
        state.newestBugsFirst = !state.newestBugsFirst
      }
    }
  }
}
</script>
