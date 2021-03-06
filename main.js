import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css'


Vue.use(VueRouter);
Vue.use(Vuex);

// 路由配置
const RouterConfig = {
  // 使用 HTML5 的 History 路由模式
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

// 数据导入
import product_data from './product.js';
import { resolve } from 'dns';
// 数组排重
function getFilterArray (array) {
  const res = [];
  const json = {};
  for (let i = 0; i < array.length; i++) {
    const _self = array[i];
    if (!json[_self]) {
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}
const store = new Vuex.Store({
  state: {
    //商品数据列表
    productList: [],
    // 购物车数据
    cartList:[]
  },
  getters: {
    brands: state => {
      const brands = state.productList.map(item => item.brand);
      return getFilterArray(brands);
    },
    colors: state => {
      const colors = state.productList.map(item => item.color);
      return getFilterArray(colors);
    }
  },
  mutations: {
    // 添加商品列表
    setProductList (state,data) {
      state.productList = data;
    },
    // 添加商品到购物车
    addCart (state,id) {
      // 如果商品已有，数量加1
      const isAdded = state.cartList.find(item => item.id === id);
      if (isAdded) {
        isAdded.count ++;
      } else {
        state.cartList.push({
          id: id,
          count: 1
        })
      }
    },
    // 清空购物车
    emptyCart (state) {
      state.cartList = [];
    },
    // 修改商品数量
    editCartCount (state,payload) {
      const product = state.cartList.find(item => item.id == payload.id);
      product.count += payload.count;
    },
    // 删除商品
    deleteCart (state,id) {
      const index = state.cartList.findIndex(item => item.id === id);
      state.cartList.splice(index,1);
    } 
  },
  actions: {
    // 请求商品列表
    getProductList (context) {
      // demo的话使用异步模拟，真实环境则用ajax获取
      setTimeout( () => {
        context.commit('setProductList',product_data)
      },500)
    },
    // 购买
    buy (context) {
      return new Promise(resolve => {
        setTimeout( () => {
          context.commit("emptyCart");
          resolve();
        },500)
      })
    }
  }
})

new Vue({
  el:"#app",
  router,
  store,
  render: h => h(App)
})