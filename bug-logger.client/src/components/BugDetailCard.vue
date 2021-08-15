<template>
  <div class="card">
    <div class="card-header">
      {{ bug.title }}
    </div>
    <div class="card-body">
      <p>{{ bug.description }}</p>
    </div>
    <div class="card-footer">
      {{ bug.creator.name || 'No Creator' }} | Created: {{ created }} | Last Update: {{ lastUpdated }}
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
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
