<template>
  <img :src="note.creator.picture" :alt="note.creator.name">
  <h4>{{ note.body }}</h4>
  <p>{{ note.creator.name }}</p>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  }
}
</script>
