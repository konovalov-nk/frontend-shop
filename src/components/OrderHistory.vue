<template>
    <div id="order-history">
        <h4>Order History</h4>
        <Table
                ref="order_history"
                :data="table_data"
                size="medium"
                style="width: 100%">
            <TableColumn type="expand">
                <template slot-scope="props">
                    <template v-for="item in props.row.order_items">
                        <pre v-bind:key="item.id">
    <b>Fortnite Boosting</b>
    {{ description(item) }}
    Wins: {{ item.quantity }}
    Price: ${{ (+item.price).toFixed(2) }}
                        </pre>
                    </template>
                </template>
            </TableColumn>

            <TableColumn
                    prop="invoice"
                    width="500"
                    label="Order Number">
                <template slot-scope="scope">
                    {{ scope.row.invoice }}
                </template>
            </TableColumn>

            <TableColumn
                    prop="status"
                    width="130"
                    align="left"
                    label="Status">
                <template slot-scope="scope">
                    <el-tag :type="getStatusTag(scope.row.status)">
                        {{ scope.row.status.toUpperCase() }}
                    </el-tag>
                </template>
            </TableColumn>

            <TableColumn
                    prop="created_at"
                    align="left"
                    label="Created">
                <template slot-scope="scope">
                    {{ time(scope.row.created_at) }}
                </template>
            </TableColumn>

            <TableColumn align="left" label="Total">
                <template slot-scope="props">
                    ${{ total(props.row.order_items) }}
                </template>
            </TableColumn>
        </Table>
    </div>
</template>

<script>
import { Button, Col, Input, Table, TableColumn, Tag, Tooltip, Row } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import { getDescription } from '@/store/cart'

locale.use(lang)

export default {
  name: 'OrderHistory',
  components: {
    'el-col': Col,
    'el-input': Input,
    'el-row': Row,
    'el-tag': Tag,
    Button,
    Table,
    TableColumn,
    Tooltip,
    Row,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    table_data() {
      return this.$store.getters['order/items']
    },
  },
  mounted() {
    this.loadOrders()
  },
  methods: {
    description(item) {
      return getDescription(item)
    },
    time(time) {
      return time.split('T').join(' ').split('.')[0]
    },
    total(orderItems) {
      return orderItems.reduce((r, item) => r + (+item.price), 0)
    },
    loadOrders() {
      this.loading = this.$loading({
        target: this.$refs.order_history.$el,
        text: 'Trying to fetch orders...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)',
      })

      this.$store.dispatch('order/fetchOrders').then(() => {
        this.loading.close()
        this.loading = false
      })
    },
    getStatusTag(status) {
      const statuses = {
        paid: 'success',
        unpaid: 'warning',
        processing: 'info',
      }

      return statuses[status]
    },
  },
}
</script>
