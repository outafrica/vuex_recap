<template>
  <div>
      <h1>Products List</h1>
      <img  v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
      <ul v-else>
          <li v-for="product in products" :key="product"> 
            {{product.title}} - {{currency(product.price)}} - {{product.inventory}}
            <button :disabled="!productInStock(product)" @click="addProductToCart(product)">Add to cart</button>
          </li>
      </ul>
  </div>
  
</template>
<script>
import { currency } from '@/currency';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data(){
    return {
      loading: false,
      currency,
    }
  },

  computed: {

    ...mapState('products',{
      products: state => state.items,
    }),

    ...mapGetters('products',{
      productInStock: 'productInStock',
    }),

  },
  
  created(){
      this.loading = true;
      this.fetchProducts().then(() => this.loading = false);
  },
  methods: {
    ...mapActions('products',{
      fetchProducts: 'fetchProducts',
    }),
    ...mapActions('cart',{
      addProductToCart: 'addProductToCart',
    }),
  },
  
}
</script>
<style scoped>

</style>