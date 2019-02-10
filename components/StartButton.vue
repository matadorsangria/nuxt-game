<template>
  <button @click="onClick(level)">{{ level.toUpperCase() }}</button>
</template>

<script>
export default {
  name: 'StartButton',
  props: ['level'],
  methods: {
    onClick: function(level) {
      document.querySelector('.default').style.display = 'none';
      this.$store.dispatch('sound', 'bgm');
      this.$store.dispatch('setPeople', level);
    }
  }
}
</script>
