<template>
  <button @click="onClick()">サインアウト</button>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$store.dispatch('firebaseSignOut').then(() => {
        // location.href = '/';
      });
    }
  }
}
</script>
