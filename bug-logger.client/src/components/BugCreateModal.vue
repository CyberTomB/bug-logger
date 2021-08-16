<template>
  <!-- Modal -->
  <div class="modal fade"
       id="createBugReport"
       tabindex="-1"
       role="dialog"
       aria-labelledby="Create Bug Report"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="form">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bugReport">
            Bug Report:
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createBug">
          <div class="modal-body">
            <div class="form-group">
              <label for="bug-title">Title:</label>
              <input type="text"
                     name="bug-title"
                     id="bug-title"
                     maxlength="80"
                     placeholder="New Bug"
                     class="form-control"
                     v-model="state.bug.title"
              >
            </div>
            <div class="form-group">
              <label for="bug-description">Description:</label>
              <textarea name="bug-description"
                        id="bug-description"
                        minlength="3"
                        placeholder="Tell us about it..."
                        class="form-control"
                        v-model="state.bug.description"
              >
              </textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close" title="Close">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
import $ from 'jquery'
import { useRouter } from 'vue-router'
export default {

  setup() {
    const router = useRouter()
    const state = reactive({
      bug: {
        title: '',
        description: ''
      }
    })
    return {
      state,
      async createBug() {
        try {
          // eslint-disable-next-line no-undef
          $('#createBugReport').modal('hide')
          // eslint-disable-next-line no-undef
          $('body').removeClass('modal-open')
          // eslint-disable-next-line no-undef
          $('.modal-backdrop').remove()
          const data = await bugsService.create(state.bug)
          router.push({ name: 'Notes List', params: { bugId: data.id } })
          Pop.toast('Bug Reported!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }

}
</script>
