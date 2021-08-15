<template>
  <div class="card">
    <div class="card-header">
      {{ bug.title }}
    </div>
    <div class="card-body">
      <p>{{ bug.description }}</p>
    </div>
    <div class="card-footer">
      {{ bug.creator.name }} | Created: {{ bug.createdAt }} | Last Update: {{ bug.updatedAt }}
    </div>
  </div>
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
