
import Home from '../../components/Home.vue';
import Product from './Product.vue';
import Category from './Category.vue';
const router = [
  {
      path: '',
      name: 'home',
      component: Home
  },
  {
      path: 'product',
      name: 'product',
      component: Product,
  },
  {
    path: 'category',
    name: 'category',
    component: Category,
},
];

export default router;