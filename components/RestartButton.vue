<template>
  <button @click="onClick">やり直す</button>
</template>

<script>
export default {
  methods: {
    onClick() {
      location.reload();
    }
  }
}
</script>
