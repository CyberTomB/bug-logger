<template>
  <div class="card">
    <div class="card-header">
      <h2>
        <!-- TODO: Close and Edit should be disabled for non-creator -->
        {{ bug.title }} <BugStatusBtn :bug-status="bug.closed" @close="closeBug" />
        <i class="mdi mdi-pencil btn btn-yellow float-right" v-if="!bug.closed && account.id === bug.creator.id" @click="edit">EDIT</i>
      </h2>
    </div>
    <div class="card-body">
      <div v-if="state.editOn">
        <form @submit.prevent="submitEdit">
          <div class="input-group">
            <textarea name="note-body"
                      id="bug-description-form"
                      cols="100"
                      rows="5"
                      class="col-10"
                      v-model="state.editedBug.description"
            ></textarea>
            <button type="submit" class="btn btn-secondary col-2">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        <!-- TODO: Fix bug description to show up correctly especially after being edited. -->
        <p>{{ bug.description }}</p>
      </div>
    </div>
    <div class="card-footer">
      <img :src="bug.creator.picture" :alt="bug.creator.name">
      {{ bug.creator.name || 'No Creator' }} | Created: {{ created }} | Last Update: {{ lastUpdated }}
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
        description: props.bug.description
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      edit() {
        if (!props.bug.closed) {
          state.editOn = !state.editOn
        }
      },
      async closeBug() {
        if (AppState.account.id === props.bug.id) {
          if (!props.bug.closed) {
            if (await Pop.confirm('Are you sure you want to close this bug?', undefined, undefined, 'Yes, close it.')) {
              await bugsService.close(props.bug)
            }
          }
        } else {
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

.btn-success{
  cursor: context-menu !important;
}
</style>
