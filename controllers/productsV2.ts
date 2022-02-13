import { Client } from 'https://deno.land/x/postgres/mod.ts'
import pool from '../config.ts'

const client = new Client(pool)

const getProducts = async ({ response }: { response: any }) => {
  try {
    await client.connect()

    const result = await client.queryObject('SELECT * FROM product')

    const products = new Array()

    result.rows.map((product) => {
      let obj: any = new Object()

      result?.rowDescription?.columns.map((el, i) => {
        obj[el.name] = products[i]
      })

      products.push(obj)
    })

    response.body = {
      success: true,
      data: products,
    }
  } catch (err) {
    response.status = 500
    response.body = {
      success: false,
      msg: err.toString(),
    }
  } finally {
    await client.end()
  }
}

const getProductById = async ({ params, response }: { params: { id: string }; response: any }) => {
  try {
    await client.connect()

    const result = await client.queryObject('SELECT * FROM products WHERE id = $1', [params.id])

    if (result.rows.toString() === '') {
      response.status = 404
      response.body = {
        success: false,
        msg: `No product with the id of ${params.id}`,
      }
      return
    } else {
      const product: any = new Object()

      result.rows.map((p) => {
        result?.rowDescription?.columns.map((el, i) => {
          product[el.name] = product[i]
        })
      })

      response.body = {
        success: true,
        data: product,
      }
    }
  } catch (err) {
    response.status = 500
    response.body = {
      success: false,
      msg: err.toString(),
    }
  } finally {
    await client.end()
  }
}

const addProduct = async ({ request, response }: { request: any; response: any }) => {
  const body = await request.body()
  const product = body.value

  if (!request.hasBody) {
    response.status = 400
    response.body = {
      success: false,
      msg: 'No Data',
    }
  } else {
    try {
      await client.connect()

      const result = await client.queryArray('INSERT INTO product (name, description, price) VALUES ($1, $2, $3)', [
        product.name,
        product.description,
        product.price,
      ])
      response.status = 201
      response.body = {
        success: true,
        data: product,
      }
    } catch (err) {
      response.status = 500
      response.body = {
        success: false,
        msg: 'Server Error',
      }
    } finally {
      await client.end()
    }
  }
}

const updateProduct = async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
  await getProductById({ params: { id: params.id }, response })

  if (response.status === 404) {
    response.body = {
      success: false,
      msg: response.body.msg,
    }
    response.status = 404
    return
  } else {
    const body = await request.body()
    const product = body.value

    if (!request.hasBody) {
      response.status = 400
      response.body = {
        success: false,
        msg: 'No data',
      }
    } else {
      try {
        await client.connect()

        const result = await client.queryArray('UPDATE product SET name=$1, description=$2, price=$3 WHERE id=$4', [
          product.name,
          product.description,
          product.price,
          params.id,
        ])

        response.status = 200
        response.body = {
          success: true,
          data: product,
        }
      } catch (err) {
        response.status = 500
        response.body = {
          success: false,
          msg: err.toString(),
        }
      } finally {
        await client.end()
      }
    }
  }
}

const deleteProduct = async ({ params, response }: { params: { id: string }; response: any }) => {
  await getProductById({ params: { id: params.id }, response })

  if (response.status === 404) {
    response.body = {
      success: false,
      msg: response.body.msg,
    }
    response.status = 404
    return
  } else {
    try {
      await client.connect()

      const result = await client.queryArray('DELETE FROM product WHERE id=$1', [params.id])

      response.body = {
        success: true,
        msg: `Product with id ${params.id} has been deleted`,
      }
      response.status = 204
    } catch (err) {
      response.status = 500
      response.body = {
        success: false,
        msg: err.toString(),
      }
    } finally {
      await client.end()
    }
  }
}

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct }
