<template>
  <i class="mx-2 mdi btn" :class="[bugStatus ? state.closedClass : state.openClass]" :title="bugStatus? 'Closed' : 'Open'" @click="$emit('close')">
  </i>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: {
    bugStatus: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      openClass: 'btn-warning mdi-progress-check',
      closedClass: 'btn-success mdi-checkbox-marked-circle'
    })
    return {
      state
    }
  }
}
</script>

<style scoped>

</style>
