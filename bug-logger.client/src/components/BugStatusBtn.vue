<template>
  <i class="mx-2 mdi btn"
     :class="[bugStatus ? state.closedClass : state.openClass]"
     :title="bugStatus? 'Closed' : 'Open'"
     @click="$emit('close')"
     @mouseover="state.hover = true"
     @mouseleave="state.hover = false"
  ><slot v-if="state.hover && !bugStatus"></slot>
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
      hover: false,
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
.btn-success:hover{
  color: white;
  background-color: #27ae60;
  border-color: #27ae60;
}
</style>
