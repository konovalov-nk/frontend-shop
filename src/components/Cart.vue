<template>
    <div :id="cart_type">
        <h4>Cart{{ orderNumber }}</h4>
        <Table
                :data="table_data"
                size="medium"
                show-summary
                :summary-method="getSummaries"
                style="width: 100%">
            <TableColumn
                    prop="product_name"
                    label="Product Name">
                <template slot-scope="scope">
                    <b class="product-name">
                        {{ scope.row.product_name }}
                    </b>
                    <br/>
                    <small class="product-description"
                           v-html="formatDescription(scope.row.product_description)">
                    </small>
                </template>
            </TableColumn>

            <TableColumn
                    prop="quantity"
                    label="Quantity"
                    width="100">
                <template slot-scope="scope">
                    x{{ scope.row.quantity }}
                </template>
            </TableColumn>

            <TableColumn
                    width="140"
                    prop="total"
                    label="Total">
            </TableColumn>

            <template v-if="!locked">
                <TableColumn
                        width="130"
                        label="Operations">
                    <template slot-scope="scope">
                        <Row>
                            <Button
                                size="mini"
                                class="micro"
                                type="warning" plain icon="el-icon-remove-outline"
                                @click="handleRemove(scope.$index, scope.row)">
                            </Button>
                            <Button
                                size="mini"
                                class="micro"
                                type="success" plain icon="el-icon-circle-plus-outline"
                                @click="handleAdd(scope.$index, scope.row)">
                            </Button>
                            <Button
                                size="mini"
                                class="micro"
                                type="danger" plain icon="el-icon-remove"
                                @click="handleDelete(scope.$index, scope.row)">
                            </Button>
                        </Row>
                    </template>
                </TableColumn>
            </template>

            <template slot="empty">
                Your cart is empty
            </template>
        </Table>

        <template v-if="!locked">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-input
                            placeholder="Enter any details here, character name, etc"
                            size="medium"
                            v-model="details">
                    </el-input>
                </el-col>
                <el-col :span="11">
                    <Tooltip content='Use "FORTNITE1" for 10% discount!'>
                        <el-input
                                placeholder="Enter coupon code here"
                                size="medium"
                                v-model="coupon"
                                clearable>
                            <Button @click="applyCoupon" slot="append" type="warning" plain>
                                Apply
                            </Button>
                        </el-input>
                    </Tooltip>
                </el-col>
            </el-row>
        </template>

    </div>
</template>

<script>
import { Button, Col, Input, Table, TableColumn, Tooltip, Row } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

export default {
  name: 'Cart',
  props: {
    cartType: '',
    locked: false,
  },
  components: {
    'el-col': Col,
    'el-input': Input,
    'el-row': Row,
    Button,
    Table,
    TableColumn,
    Tooltip,
    Row,
  },
  data() {
    return {
      example_data: [{
        id: 1,
        product_name: 'LoL ELO Boost',
        product_description: 'Server EUW, Competitive Mode: Flex, My Division Bronze 3, Desired Division Gold 5',
        quantity: 1,
        total: '$372.60',
      }, {
        id: 2,
        product_name: 'CS GO Rank Boost',
        product_description: 'CS Rank Silver 4, Desired CS Rank Gold Nova 3, Special: Play with a Booster, Special: Stream My Boost',
        quantity: 1,
        total: '$43.13',
      }, {
        id: 3,
        product_name: 'Overwatch Ranked Boost',
        product_description: 'Server Europe, Platform: PC, Overwatch Rank 123, Desired Over Rank 1242, Special: Play with a Booster, Special: Stream My Boost',
        quantity: 1,
        total: '$115.82',
      },
      ],
    };
  },
  computed: {
    coupon: {
      get() {
        return this.$store.getters['cart/coupon'];
      },
      set(coupon) {
        return this.$store.dispatch('cart/changeCoupon', coupon);
      },
    },
    details: {
      get() {
        return this.$store.getters['cart/orderDetails'];
      },
      set(details) {
        return this.$store.dispatch('cart/changeOrderDetails', details);
      },
    },
    table_data() {
      return this.$store.getters['cart/itemsFormatted'];
    },
    cart_type() {
      return this.cartType === '' ? 'cart' : 'cart-simple';
    },
    orderNumber() {
      return this.$store.getters['cart/orderNumberFormatted'];
    },
  },
  methods: {
    getSummaries() {
      return [
        this.$store.getters['cart/currentCoupon'],
        'Total Cost:',
        this.$store.getters['cart/totalFormatted'],
      ];
    },
    formatDescription(description) {
      return description.split(',').map(d => d.trim()).join('<br />');
    },
    handleAdd(index, row) {
      this.$store.dispatch('cart/increase', row.id);
    },
    handleRemove(index, row) {
      this.$store.dispatch('cart/decrease', row.id);
    },
    handleDelete(index, row) {
      this.$store.dispatch('cart/remove', row.id);
    },
    applyCoupon() {
      this.$store.dispatch('cart/applyCoupon', this.coupon);
    },
  },
};
</script>

<style lang="less">
    #cart, #cart-simple {
        .cell {
            line-height: 12pt;
        }
        .product-name {
            line-height: 1;
        }
        .product-description {
            line-height: 1.2;
        }

        button.el-button.micro {
            padding: 3px;
            font-size: 19px;
        }
        td.is-leaf {
            font-weight: bold;
        }
    }
</style>
