<template>
    <ContentGridSimple :active="4">
        <template slot="content">
            Thank you for buying our services! We would contact you soon.
        </template>
        <template slot="buttons">
            <router-link :to="{name: 'index'}">
                <Button type="primary">Start again</Button>
            </router-link>
        </template>
    </ContentGridSimple>
</template>

<script>
import ContentGridSimple from '@/components/layouts/ContentGridSimple.vue';
import { Button } from 'element-ui';

export default {
  name: 'ConfirmOrderPage',
  components: {
    Button, ContentGridSimple,
  },
  data() {
    return {
    };
  },
};
</script>
