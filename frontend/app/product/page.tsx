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
import Sidebar from '../components/SideBar'
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
    // 定义获取产品的异步函数
    const getProducts = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          setJwtToken(token) // 设置 JWT token
          console.log(token)
        }

        // 确保 token 被正确设置之后再调用 getCart
        if (jwtToken) {
          const data = await axios.get('http://localhost:8080/shops/products')
          setProducts(data.data.productList) // 设置产品数据
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    // 定义获取购物车的异步函数
    const getCart = async () => {
      try {
        if (jwtToken) {
          const cart = await axios.post(
            'http://localhost:8080/users/carts',
            {},
            {
              headers: { Authorization: `${jwtToken}` }, // 发送 POST 请求时带上 token
            }
          )
          console.log(cart.data)
          setCart_id(cart.data.cart_id)
          console.log(cart_id)
          const data = await axios.get(
            'http://localhost:8080/users/carts/list',
            {
              headers: { Authorization: `${jwtToken}` }, // 发送 GET 请求时带上 token
            }
          )
          console.log(data.data)
          // if (data.data.Carts_List.length > 0) {
          //   const idx = data.data.Carts_List.length - 1
          //   setCart_id(data.data.Carts_List[idx])
          //   console.log(cart_id)
          //   //console.log('test')
          // }
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
      }
    }

    getProducts() // 调用获取产品的函数

    // 使用 useEffect 中的 cleanup 函数或依赖数组来确保 getCart 在 jwtToken 更新后被调用
    if (jwtToken) {
      getCart() // 调用获取购物车的函数
    }
  }, [jwtToken]) // 依赖 jwtToken 的变化

  return (
    <>
      <Sidebar page="product" />
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"></header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="ml-auto flex items-center gap-2">
              <CartPage jwtToken={jwtToken} cart_id={cart_id} />
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
                          <InfoPage
                            product={product}
                            cart_id={cart_id}
                            jwtToken={jwtToken}
                          />
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
