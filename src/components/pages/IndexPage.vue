<template>
    <ContentGrid :active="0">
        <template slot="content">
            <Faq/>
            <OrderForm/>
        </template>
    </ContentGrid>
</template>

<script>
import ContentGrid from '@/components/layouts/ContentGrid.vue';
import Faq from '@/components/Faq.vue';
import OrderForm from '@/components/OrderForm.vue';
import Cart from '@/components/Cart.vue';
import { Button } from 'element-ui';

export default {
  name: 'IndexPage',
  components: {
    Button, Cart, ContentGrid, Faq, OrderForm,
  },
};
</script>
