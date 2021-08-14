<template>
  <h2>{{ bug.title }}</h2>
</template>

<script>
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  }
}
</script>
