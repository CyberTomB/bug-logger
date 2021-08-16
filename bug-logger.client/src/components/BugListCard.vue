<template>
  <router-link :to="{name: 'Notes List', params: {bugId: bug.id}}" class="card">
    <div class="row py-1" :class="state.oddIndex ? 'bg-grey' : 'bg-light'">
      <div class="col-3">
        {{ bug.title }}
      </div>
      <div class="col-3">
        {{ bug.creator.name }}
      </div>
      <div class="col">
        {{ lastUpdated }}
      </div>
      <div class="col-3">
        <BugStatusBtn :bug-status="bug.closed" />
      </div>
    </div>
  </router-link>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      // isClosed: props.bug.closed,
      // openClass: 'btn-warning mdi-progress-check',
      // closedClass: 'btn-success mdi-checkbox-marked-circle',
      oddIndex: computed(() => !!(props.index % 2))
    })
    return {
      state,
      lastUpdated: computed(() => {
        const d = new Date(props.bug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      })
    }
  }
}
</script>

<style scoped>
/* "Disabled" the hover effect in order to keep the btn shape and color */
.btn-warning:hover{
  color: black;
  background-color: #ff7f50;
  border-color: #ff7f50;
}

.btn-success:hover{
  color: white;
  background-color: #27ae60;
  border-color: #27ae60;
}
</style>
