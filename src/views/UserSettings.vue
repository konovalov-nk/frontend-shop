<template>
  <div class="home">
    <img src="../assets/logo.png">
    <Index msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Index from '@/components/Index.vue';

export default {
  name: 'user_settings',
  components: {
    Index,
  },
};
</script>
