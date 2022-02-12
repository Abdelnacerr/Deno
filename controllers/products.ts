import { Product } from '../models/products.ts'
let Products: Array<Product> = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    price: 200,
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'Description 3',
    price: 300,
  },
]

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: Products,
  }
}

const getProductById = ({ params, response }: { params: { id: string }; response: any }) => {
  const product = Products.filter((product) => product.id === params.id)

  if (product.length) {
    response.status = 200
    response.body = {
      success: true,
      data: product[0],
    }
  } else {
    response.status = 400
    response.body = {
      success: false,
      msg: 'Cannot find product',
    }
  }
}

const addProduct = async ({ request, response }: { request: any; response: any }) => {
  const body = await request.body()

  if (!request.hasBody) {
    response.status = 400
    response.body = {
      success: false,
      msg: 'No Data',
    }
  } else {
    const product: Product = body.value
    product.id = "4"
    Products.push(product)

    response.status = 201

    response.body = {
      success: true,
      data: product,
    }
  }
}

const updateProduct = async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
    const product: Product | undefined = Products.find((product) => product.id === params.id)

  if (product) {
    const body = await request.body
    
    const updatedProduct: { name?: string; description?: string; price?: number } = body.value
    Products = Products.map((product) => (product.id === params.id ? { ...product, ...updatedProduct } : product))

    response.status = 200
    response.body = {
      success: true,
      data: Products,
    }
  } else {
    response.status = 404
    response.body = {
      success: false,
      msg: 'No product  found',
    }
  }
}

const deleteProduct = async ({ params, response }: { params: { id: string }; response: any }) => {
  Products = Products.filter((product) => product.id !== params.id)

  if (!Products.length) {
    response.status = 404
    response.body = {
      success: false,
      msg: 'No product  found',
    }
  } else {
    response.status = 200
    response.body = {
      success: true,
      data: Products,
    }
  }
}

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct }
