'use client'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface CartData {
  product_id: string
  size: string
  color: string
  count: number
}

const temp: CartData[] = [
  {
    product_id: '1',
    size: 's',
    color: 'red',
    count: 1,
  },
]
interface CartProps {
  open: boolean
  setOpen: (open: boolean) => void
  cart_id: string
}

interface Cart {
  name: string
  brand: string
  imgurl: string
  price: number
  count: number
  size: string
  color: string
}
const productTemp: Cart[] = [
  {
    name: 'Throwback Hip Bag',
    brand: '',
    size: '',
    color: 'Salmon',
    price: 90,
    count: 1,
    imgurl:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
  },
  {
    name: 'Medium Stuff Satchel',
    brand: '',
    size: 'M',
    color: 'Blue',
    price: 32,
    count: 1,
    imgurl:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
  },
  // More products...
]

// const CartPage: React.FC<CartProps> = ({ open, setOpen, cart_id }) => {
const CartPage = () => {
  useEffect(() => {
    const getCart = async () => {
      // const { data } = await axios.get(`${API_URL}/user/cart/${cart_id}`)
      // setCart(data)
    }
    //getCart()
  }, [])
  async function removeFromCart(cart_id: string) {
    //
    //await axios.delete(`${API_URL}/user/cart`)
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Cart</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>SIze</TableHead>
                <TableHead>Color</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {temp.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.product_id}
                  </TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CartPage
