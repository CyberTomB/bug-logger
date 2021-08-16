<template>
  <div class="card mb-3">
    <div class="row g-0 align-items-center">
      <div class="col-3 text-center">
        <img :src="note.creator.picture" class="img-fluid rounded" :alt="note.creator.name">
      </div>
      <div class="col-7">
        <div class="card-body">
          <small class="card-title">
            {{ note.creator.name }}
          </small>
          <p class="card-text">
            {{ note.body }}
          </p>
          <p class="card-text border-top">
            <small class="text-muted">{{ note.createdAt }} | {{ note.updatedAt }}</small>
          </p>
        </div>
      </div>
      <div class="col-2">
        <i v-if="account.id === note.creator.id" class="btn mdi mdi-delete btn-danger" title="Delete Note" @click="deleteNote"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteNote() {
        try {
          await notesService.destroy(props.note)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>
