<template>
  <button @click="onClick">やり直す</button>
</template>

<script>
export default {
  name: 'StartButton',
  methods: {
    onClick: function() {
      location.reload();
    }
  }
}
</script>
