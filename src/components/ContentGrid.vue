<template>
    <div>
        <header>
            <h1>Fortnite Boosted</h1>
        </header>
        <main>
            <div id="content-grid">
                <Faq/>
                <OrderForm/>
            </div>
        </main>
    </div>
</template>

<script>
import Faq from '@/components/Faq.vue';
import OrderForm from '@/components/OrderForm.vue';

export default {
  name: 'ContentGrid',
  components: {
    Faq, OrderForm,
  },
};
</script>

<style scoped lang="less">

</style>
