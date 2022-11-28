import shop from '@/api/shop';

export default {
    namespaced: true,
    state: {
        // data
        item: [],
        checkoutStatus: null,
    },
    getters: {
        cartProducts(state, getters, rootState){
            return state.item.map(cartItem => {
                const products = rootState.products.items.find(product => product.id === cartItem.id);

                return {
                    title: products.title,
                    price: products.price,
                    quantity: cartItem.quantity
                };
            });
        },
        cartTotal(state,getters){
            // let total = 0;
            // getters.cartProducts.forEach(product => {
            //     total += product.price * product.quantity;
            // });
            // return total;
            return getters.cartProducts.reduce((total,product) => total += product.price * product.quantity, 0);
        },
    },

    actions: {
        // eslint-disable-next-line
        addProductToCart({state, getters, commit, rootState, rootGetters}, product){
            if(rootGetters['products/productInStock'](product)){
                const cartItem = state.item.find(cartProduct => cartProduct.id == product.id);
                if(!cartItem){
                    commit('pushProductToCart', product.id);
                }else{
                    commit('incrementProductQuantity', cartItem);
                } 
                
                commit('products/decrementProductInventory', product, {root: true});
                
            }else{
                // show out of stock message
            }
        },

        checkout({state, commit}){
            shop.buyProducts(
                state.item,
                () => {
                    commit('emptyCart');
                    commit('setCheckoutStatus', 'success');
                },
                () => {
                    commit('setCheckoutStatus', 'failed');
                }
            );
        }
    },

    mutations: {
        // state listeners
       
        pushProductToCart(state, productID){
            state.item.push({
                id: productID,
                quantity: 1,
            });
        },
        incrementProductQuantity(state, cartItem) {
            cartItem.quantity++; 
        },
      
        setCheckoutStatus(state, status){
            state.checkoutStatus = status;
        },
        emptyCart(state){
            state.item = [];
        }
    }
}