import list from './views/list.vue';

const routers = [
  {
    path: '/list',
    meta: {
      title:'商品列表'
    },
    component: list
  },
  { 
    path:"*",
    redirect:'/list'
  }
];

export default routers;
