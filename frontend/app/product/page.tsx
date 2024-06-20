'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import EditInfo from './editInfo'
import InfoPage from './info'
import CartPage from './cart'
import NewProduct from './add'
import EditProduct from './edit'
import { Button } from '@/components/ui/button'
import { Sidebar } from '../sidebar/page'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface Product_t {
  id: string
  name: string
  brand: string
  price: number
  desc: string
  imgurl: string[]
}
async function getCartId() {
  let cart_id = ''
  const data = await axios.get(`http://localhost:8080/users/carts/list`)
  //Create a new cart
  // return cart_id
}
async function deleteProduct(id: string, jwtToken: string) {
  const res = await axios.delete(`http://localhost:8080/shops/products/${id}`, {
    headers: { Authorization: jwtToken },
  })
  if (res.data.message == 'Delete product successfully') {
    alert('Delete product successfully')
  } else {
    console.log(res)
  }
}
export default function Product() {
  const [products, setProducts] = useState<Product_t[]>([])
  const [jwtToken, setJwtToken] = useState('')
  const [cart_id, setCart_id] = useState('')
  useEffect(() => {
    const login = async (email: string, password: string) => {
      const res = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password,
      })
      console.log(res.data)
      setJwtToken(res.data.jwtToken)
      // console.log(jwtToken)
      // await axios.post('http://localhost:8080/users/carts/', null, {
      //   headers: { Authorization: jwtToken }, // 将设置的头部信息传递给 Axios 请求配置
      // })
      //
      // const data = await axios.get(`http://localhost:8080/users/carts/list`, {
      //   headers: { Authorization: jwtToken },
      // })
      // console.log(data.data)
      // if (data.data.Cart_List) {
      //   setCart_id(data.data.Cart_List[0])
      //   console.log(cart_id)
      // }
    }
    login('admin', 'admin')

    const getProducts = async () => {
      const data = await axios.get('http://localhost:8080/shops/products')
      // console.log(data.data)
      // console.log(data.data.productList)
      // const { data } = await axios.get(`${API_URL}/shop/product`)
      setProducts(data.data.productList)
      // console.log(products)
    }
    getProducts()

    const getCart = async () => {
      const data = await axios.get(`http://localhost:8080/users/carts/list`, {
        headers: { Authorization: `${jwtToken}` },
      })
      if (data.data.Cart_List) {
        setCart_id(data.data.Cart_List[0])
        console.log(cart_id)
      }
      // console.log(data.data.Cart_List[0])
    }

    //getCart()
  }, [])

  return (
    <>
      <Sidebar />
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"></header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="ml-auto flex items-center gap-2">
              <CartPage jwtToken={jwtToken} />
              <NewProduct jwtToken={jwtToken} />
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Brand
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Buy</span>
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Edit</span>
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Edit Info</span>
                      </TableHead>

                      <TableHead>
                        <span className="sr-only">Delete</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt={''}
                            className="aspect-square rounded-md object-cover"
                            height={64}
                            src={''}
                            width={64}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          ${product.price}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.brand}
                        </TableCell>
                        <TableCell>
                          <InfoPage product={product} />
                        </TableCell>
                        <TableCell>
                          <EditProduct
                            jwtToken={jwtToken}
                            initialProductData={product}
                          />
                        </TableCell>
                        <TableCell>
                          <EditInfo
                            jwtToken={jwtToken}
                            productId={product.id}
                          />
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              deleteProduct(product.id, jwtToken)
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  )
}
