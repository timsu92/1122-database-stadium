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
export interface cartProps {
  jwtToken: string
  cart_id: string
}

const CartPage: React.FC<cartProps> = ({ jwtToken, cart_id }) => {
  // console.log(jwtToken)
  //const [cart_id, setCart_id] = useState('')
  const defaultCartData: CartData[] = [
    {
      product_id: 'empty', // 使用一个表示空的 id
      size: 'none', // 尺寸不可用
      color: 'none', // 颜色不可用
      count: 0, // 数量为 0
    },
  ]
  const [cartData, setCartData] = useState<CartData[]>(temp)
  const [empty, setEmpty] = useState(false)
  const getCart = async () => {
    console.log(jwtToken, cart_id)
    try {
      const data = await axios.get(
        `http://localhost:8080/users/carts/list-cart?cart_id=${cart_id}`,
        {
          headers: { Authorization: `${jwtToken}` },
        }
      )
      console.log(data.data)
      setCartData(data.data.Products_in_Cart_List)
      if (data.data.message == 'cart is empty') {
        setEmpty(true)
      }

      // alert('add to cart success')
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
    //   if (data.data.Cart_List) {
    //     setCart_id(data.data.Cart_List[0])
    //     console.log(cart_id)
    //   }
    //   // console.log(data.data.Cart_List[0])
  }
  async function removeFromCart(product: CartData) {
    //
    try {
      const data = await axios.delete(
        `http://localhost:8080/users/carts/remove`,
        {
          data: {
            cart_id: cart_id,
            product_id: product.product_id,
            size: product.size,
            color: product.color,
            count: 1,
          },
          headers: { Authorization: jwtToken },
        }
      )
      console.log(data.data)
      alert('remove from cart successfully')
    } catch (err) {
      console.error('Error remove from cart:', err)
    }
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
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Remove</TableHead>
              </TableRow>
            </TableHeader>
            {cartData && (
              <TableBody>
                {cartData.map((item, index) => (
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
                          removeFromCart(item)
                        }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CartPage
