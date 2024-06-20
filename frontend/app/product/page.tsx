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
const productTemp: Product_t[] = [
  {
    id: '1',
    name: 'Earthen Bottle',
    brand: 'qwe',
    price: 48,
    desc: '',
    imgurl: [
      '',

      //'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    ],
  },
  {
    id: '2',
    name: 'Machined Mechanical Pencil',
    brand: 'dev',
    price: 200,
    desc: '',
    imgurl: [
      '',
      //'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    ],
  },
  {
    id: '3',
    name: 'Earthen Bottle',
    brand: 'abc',
    price: 100,
    desc: '',
    imgurl: [
      '',
      // 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    ],
  },
  {
    id: '4',
    name: 'Machined Mechanical Pencil',
    brand: 'brand',
    price: 450,
    desc: '',
    imgurl: [
      '',
      // 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    ],
  },

  // More products...
]

async function getCartId() {
  let cart_id = ''
  // const data = await axios.get(`${API_URL}/user/cart/list`)
  // if (no available cart){
  //   //Create a new cart
  // }
  return cart_id
}
async function deleteProduct(id: string) {
  const res = await axios.delete(`http://localhost:8080/shops/products/${id}`)
  if (res.data.message == 'Delete product successfully') {
    return
  } else {
    console.log(res)
  }
}
export default function Dashboard() {
  const [products, setProducts] = useState<Product_t[]>([])
  const [selectProduct, setSelectProduct] = useState<Product_t>(productTemp[0])
  const [jwtToken, setJwtToken] = useState('')

  useEffect(() => {
    const login = async (email: string, password: string) => {
      const res = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password,
      })
      console.log(res.data)
      setJwtToken(res.data.jwtToken)
    }
    login('admin', 'admin')

    const getProducts = async () => {
      // const res = await fetch('http://localhost:8080/shops/products')
      const data = await axios.get('http://localhost:8080/shops/products')
      // console.log(data.data)
      // console.log(data.data.productList)
      // const { data } = await axios.get(`${API_URL}/shop/product`)
      setProducts(data.data.productList)
      // console.log(products)
    }
    getProducts()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"></header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="ml-auto flex items-center gap-2">
            <CartPage />
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
                        <EditInfo jwtToken={jwtToken} productId={product.id} />
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            deleteProduct(product.id)
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
  )
}
