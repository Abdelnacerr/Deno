import { Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/products.ts'

const router = new Router()

router
  .get('/products', getProducts)
  .get('/products/:id', getProductById)
  .post('/products', addProduct)
  .put('/products/:id', updateProduct)
  .delete('/products/:id', deleteProduct)

export default router
