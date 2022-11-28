import Vuex from 'vuex'
import { createApp } from 'vue'
import cart from '@/store/modules/cart'
import products from '@/store/modules/products'

const app = createApp();

app.use(Vuex)

export default new Vuex.Store({
    modules: {
        cart,
        products,
    },
    state: {
        // data
      
    },
    getters: {
        // computed 
    
    },

    actions: {
        //methods

    },

    mutations: {
        // state listeners
    }
})