<template>
    <div>
        <header>
            <h1>Fortnite Boosted</h1>
        </header>
        <main>
            <div id="content-grid">
                <Faq/>
                <OrderForm/>
                <Cart />
            </div>
        </main>
    </div>
</template>

<script>
import Faq from '@/components/Faq.vue';
import OrderForm from '@/components/OrderForm.vue';
import Cart from '@/components/Cart.vue';

export default {
  name: 'ContentGrid',
  components: {
    Cart, Faq, OrderForm,
  },
};
</script>

<style scoped lang="less">

</style>
