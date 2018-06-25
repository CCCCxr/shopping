import list from './views/list.vue';
import product from './views/product.vue';
import cart from './views/cart.vue';
const routers = [
  {
    path: '/list',
    meta: {
      title:'商品列表'
    },
    component:list
  },
  {
    path: '/cart',
    meta: {
      title: '购物车'
    },
    component:cart
  },
  {
    path: '/product/:id',
    meta: {
      title:'商品详情'
    },
    component:product
  },
  { 
    path:"*",
    redirect:'/list'
  }
];

export default routers;
