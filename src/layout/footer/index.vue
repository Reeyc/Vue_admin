<template>
  <div class="footer" :style="{ color: $route.name === 'home' ? '#eee' : '#000' }">
    &copy;&nbsp;&nbsp;2020&nbsp;&nbsp;&nbsp;&nbsp;<a
      href="https://github.com/Reeyc"
      target="_blank"
      :style="{ color: $route.name === 'home' ? '#eee' : '#000' }"
      >https://github.com/Reeyc</a
    >
  </div>
</template>

<script>
export default {};
</script>
