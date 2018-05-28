<template>
    <div>
        <h4>Payment</h4>

        <p>
            Please select the preferred payment method to use on this order.
        </p>

        <el-row :gutter="20">
            <el-col>
                <Radio v-model="payment" label="1" border>PayPal</Radio>
                <Tooltip content="We are not supporting credit cards at the moment, but will be soon">
                    <Radio v-model="payment" label="2" border disabled>Credit Card</Radio>
                </Tooltip>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { Radio, Row, Col, Tooltip } from 'element-ui';

export default {
  name: 'Payment',
  components: {
    'el-col': Col,
    'el-row': Row,
    Radio,
    Tooltip,
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
