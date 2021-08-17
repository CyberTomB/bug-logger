<template>
  <div class="card">
    <div class="card-header">
      <h2 class="bug-title">
        <!-- TODO: Close and Edit should be disabled for non-creator -->
        {{ bug.title }} <BugStatusBtn :bug-status="bug.closed" @close="closeBug">
          {{ bug.creator.id === account.id ? 'Close Bug?' : null }}
        </BugStatusBtn>
        <i class="mdi mdi-pencil btn btn-yellow float-md-right" title="Edit" aria-label="Edit" v-if="!bug.closed && account.id === bug.creator.id" @click="edit">EDIT</i>
      </h2>
    </div>
    <div class="card-body">
      <div v-if="state.editOn">
        <!-- <EditForm :populate="state.editedBug" /> -->
        <form @submit.prevent="submitEdit">
          <div class="input-group">
            <textarea name="note-body"
                      id="bug-description-form"
                      cols="100"
                      rows="5"
                      class="col-10"
                      v-model="state.editedBug.description"
            ></textarea>
            <button type="submit" class="btn btn-secondary col-2" aria-label="Submit" title="Submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        <!-- TODO: Fix bug description to show up correctly especially after being edited. -->
        <h4>{{ bug.description }}</h4>
      </div>
    </div>
    <div class="card-footer text-muted align-items-end d-flex">
      <img :src="bug.creator.picture" :alt="bug.creator.name" :title="bug.creator.name" class="creator-picture img-fluid mr-3">
      Submitted by: {{ bug.creator.name || 'No Creator' }} | Created: {{ created }} | Last Update: {{ lastUpdated }}
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      editOn: false,
      editedBug: {
        oldDescription: computed(() => AppState.chosenBug.description),
        description: ''
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      edit() {
        if (!props.bug.closed) {
          state.editOn = !state.editOn
          state.editedBug.description = state.editedBug.oldDescription
        }
      },
      async closeBug() {
        if (AppState.account.id === props.bug.creator.id) {
          if (!props.bug.closed) {
            if (await Pop.confirm('Are you sure you want to close this bug?', undefined, undefined, 'Yes, close it.')) {
              await bugsService.close(props.bug)
            }
          }
        } else if (!props.bug.closed) {
          Pop.toast('Only the creator can close their bugs.')
        }
      },
      async submitEdit() {
        state.editOn = !state.editOn
        await bugsService.edit(state.editedBug, props.bug)
      },
      created: computed(() => {
        const d = new Date(props.bug.createdAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      }),
      lastUpdated: computed(() => {
        const d = new Date(props.bug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      })
    }
  }
}
</script>

<style scoped>
.btn-yellow{
  background-color: rgb(220, 224, 7);
}
.btn-yellow:hover{
  background-color: rgb(243, 245, 111)
}

.btn-success{
  cursor: context-menu !important;
}

.creator-picture{
  max-height: 5vh;
  max-width: 5vh;
}

.bug-title{
  font-weight: 600;
}
</style>
