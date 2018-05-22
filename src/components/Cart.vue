<template>
    <div id="cart">
        <b>Cart</b>
        <Table
                :data="table_data"
                size="mini"
                show-summary
                :summary-method="getSummaries"
                style="width: 100%">
            <TableColumn
                    prop="product_name"
                    label="Product Name"
                    width="375">
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
                    width="90">
                <template slot-scope="scope">
                    x{{ scope.row.quantity }}
                </template>
            </TableColumn>
            <TableColumn
                    prop="total"
                    label="Total">
            </TableColumn>
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
            <template slot="empty">
                Your cart is empty
            </template>
        </Table>
    </div>
</template>

<script>
import { Button, Table, TableColumn, Row } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

export default {
  name: 'Cart',
  components: {
    Button, Table, TableColumn, Row
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
    table_data() {
      return this.$store.getters['cart/itemsFormatted'];
    },
  },
  methods: {
    getSummaries() {
      return [
        'Total Cost',
        '',
        this.$store.getters['cart/totalFormatted']
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
  },
};
</script>

<style lang="less">
    #cart {
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
    }
</style>
