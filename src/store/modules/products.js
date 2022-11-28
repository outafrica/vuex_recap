import shop from '@/api/shop';

export default {
    namespaced: true,
    state: {
        // data
        items: [],
    },
    getters: {
        // computed 
        availableProducts(state){
            return state.items.filter(product => product.inventory > 0 )
        },
        productInStock(){
            return (product) => {
                return product.inventory > 0;
            };
        },
    },

    actions: {
        fetchProducts({commit}){
            return new Promise((resolve)=>{
                shop.getProducts(products => {
                    commit('setProducts', products);
                    resolve();
                  });
            });
        },
    },

    mutations: {
        // state listeners
        setProducts(state, products){
            // ...
            state.items = products;
        },
        decrementProductInventory(state, product){
            product.inventory--;
        },
    }
}