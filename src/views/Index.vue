<template>
  <IndexPage />
</template>

<script>
import IndexPage from '@/components/pages/IndexPage.vue';

export default {
  name: 'index',
  components: {
    IndexPage,
  },
  mounted() {
    const jwt = localStorage.getItem('APP_KEY_JWT');
    this.$store.dispatch('user/setJWTFetch', jwt);
  },
};
</script>
