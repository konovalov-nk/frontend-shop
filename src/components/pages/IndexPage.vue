<template>
    <ContentGridSimple :active="0">
        <template slot="content">
            <el-row class="row-flex-wrap" :gutter="40">
                <el-col class="col--faq" :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
                    <Faq/>
                </el-col>
                <el-col class="col--order-form" :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
                    <OrderForm/>
                </el-col>
            </el-row>
        </template>
    </ContentGridSimple>
</template>

<script>
import ContentGridSimple from '@/components/layouts/ContentGridSimple.vue';
import Faq from '@/components/Faq.vue';
import OrderForm from '@/components/OrderForm.vue';
import Cart from '@/components/Cart.vue';
import { Button, Row, Col } from 'element-ui';

export default {
  name: 'IndexPage',
  components: {
    'el-row': Row,
    'el-col': Col,
    Button,
    Cart,
    ContentGridSimple,
    Faq,
    OrderForm,
  },
};
</script>

<style lang="less">
    .row-flex-wrap.el-row {
        display: flex;
        flex-flow: row wrap;
    }
    .col--faq {
        order: 2;
    }
    .col--order-form {
        order: 1;
    }


    @media only screen and (min-width: 992px) {
        .row-flex-wrap.el-row {
            display: block;
        }
    }
</style>
