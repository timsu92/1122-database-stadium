'use client'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import axios from 'axios'
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
export interface cartProps {
  jwtToken: string
}

const CartPage: React.FC<cartProps> = ({ jwtToken }) => {
  // console.log(jwtToken)
  const [cart_id, setCart_id] = useState('')
  const getCart = async () => {
    const cart = await axios.post('http://localhost:8080/users/carts', {
      headers: { Authorization: jwtToken },
    })
    console.log(cart.data)

    const data = await axios.get(`http://localhost:8080/users/carts/list`, {
      headers: { Authorization: `${jwtToken}` },
    })
    if (data.data.Cart_List) {
      setCart_id(data.data.Cart_List[0])
      console.log(cart_id)
    }
    // console.log(data.data.Cart_List[0])
  }
  async function removeFromCart(cart_id: string) {
    //
    //await axios.delete(`${API_URL}/user/cart`)
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              getCart()
            }}
          >
            Open Cart
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product Id</TableHead>
                <TableHead>SIze</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Remove</TableHead>
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
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        //deleteProduct(product.id, jwtToken)
                      }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CartPage
