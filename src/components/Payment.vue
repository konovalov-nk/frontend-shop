<template>
    <div>
        <h4>Payment</h4>

        <p>
            Please select the preferred payment method to use on this order.
        </p>

        <el-row :gutter="20">
            <el-col>
                <Radio v-model="payment" label="1" border>PayPal</Radio>
                <Radio v-model="payment" label="2" border disabled>Credit Card</Radio>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { Radio, Row, Col } from 'element-ui';

export default {
  name: 'Payment',
  components: {
    'el-col': Col,
    'el-row': Row,
    Radio,
  },
  data() {
    return {
      payment: '1',
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="less">
    hr {
        border-top: 1pt solid #d8dbe2;
        border-bottom: none;
        border-left: none;
        border-right: none;
    }
</style>
