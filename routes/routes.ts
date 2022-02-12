import { Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts';
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.ts';

const router = new Router();

router.get( '/products', getProducts );

router.get( '/products/:id', getProductById );

router.post('/products', addProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);



export default router;
