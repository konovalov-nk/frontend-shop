<template>
    <ContentGridSimple :active="0">
        <template slot="content">
            <el-row :gutter="40">
                <el-col :span="24">
                    <OrderHistory/>
                </el-col>
            </el-row>
        </template>
    </ContentGridSimple>
</template>

<script>
import ContentGridSimple from '@/components/layouts/ContentGridSimple.vue';
import OrderHistory from '@/components/OrderHistory.vue';
import { Button, Row, Col } from 'element-ui';

export default {
  name: 'OrderHistoryPage',
  components: {
    'el-row': Row,
    'el-col': Col,
    Button,
    ContentGridSimple,
    OrderHistory,
  },
};
</script>
