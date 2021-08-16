<template>
  <form @submit.prevent="$emit('submit')">
    <div class="input-group">
      <textarea name="note-body"
                id="bug-description-form"
                cols="100"
                rows="5"
                class="col-10"
                v-model="state.description"
      ></textarea>
      <button type="submit" class="btn btn-secondary col-2">
        SUBMIT
      </button>
    </div>
  </form>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
  props: {
    populate: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const state = {
      description: 'example'
    }
    onMounted(() => {
      state.description = props.populate.description
    })
    return {
      state
    }
  }
}
</script>
