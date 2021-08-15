<template>
  <h1>Notes List</h1>
  <p v-for="note in notes" :key="note.id">
    {{ note.body }}
  </p>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await notesService.getAllByBugId(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      notes: computed(() => AppState.notes)
    }
  }
}
</script>
