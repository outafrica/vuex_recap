<template>
  <div>
      <h1>Shopping Cart</h1>
      <ul>
          <li v-for="product in products" :key="product"> 
            {{product.title}} - {{currency(product.price)}} - {{product.quantity}}
          </li>
      </ul>
      <p>Total :{{currency(total)}} </p>
      <button @click="checkout">Checkout</button>
      <p v-if="checkoutStatus" style="color:green">{{checkoutStatus}}</p>
  </div>
  
</template>
<script>
import { currency } from '@/currency';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data(){
    return {
      currency,
    }
  },
  computed: {
    ...mapState('cart',{
      checkoutStatus: state => state.checkoutStatus,
    }),
    ...mapGetters('cart',{
      products: 'cartProducts',
      total: 'cartTotal',
    }),

  },
  methods: {
    ...mapActions('cart',{
      checkout: 'checkout',
    }),
  },
  
}
</script>
<style scoped>

</style>