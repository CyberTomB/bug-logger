<template>
  <h1>{{ bug.title }}</h1>
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
