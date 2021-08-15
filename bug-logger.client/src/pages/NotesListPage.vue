<template>
  <div class="row justify-content-around">
    <div class="card-body border-top col-8">
      <form class="row" @submit.prevent="createNote">
        <small>Add Note:</small>
        <div class="input-group">
          <textarea name="body" class="form-control" aria-label="new-post" v-model="state.newNote.body"></textarea>
          <button class="btn btn-secondary" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="row justify-content-around">
    <div class="col-10">
      <h1>Notes List</h1>
      <NoteCard v-for="note in notes" :key="note.id" :note="note">
      </NoteCard>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {
        body: '',
        bugId: route.params.bugId
      }
    })
    onMounted(async() => {
      try {
        await notesService.getAllByBugId(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      notes: computed(() => AppState.notes),
      async createNote() {
        try {
          await notesService.create(state.newNote)
          state.newNote = { bugId: route.params.bugId }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>
