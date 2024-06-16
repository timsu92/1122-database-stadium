import { useState, useEffect } from 'react'
import axios from 'axios'

import { Product_t } from './page'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export interface ProductStore_t {
  product_id: string
  size: string
  color: string
  count: number
  id: string
  sold: number
}
export const infoTemp: ProductStore_t[] = [
  {
    product_id: '1',
    size: 'XS',
    color: 'White',
    id: '1',
    count: 5,
    sold: 0,
  },
  {
    product_id: '1',
    size: 'S',
    color: 'White',
    id: '2',
    count: 5,
    sold: 0,
  },
  {
    product_id: '1',
    size: 'M',
    color: 'White',
    id: '3',
    count: 5,
    sold: 0,
  },
  {
    product_id: '1',
    size: 'L',
    color: 'White',
    id: '4',
    count: 0,
    sold: 0,
  },
]
interface InfoProps {
  // cart_id: string
  product: Product_t
}

async function addToCart(product: ProductStore_t, cart_id: string) {
  //
  //await axios.post(`${API_URL}/user/cart/add`)
}

//const InfoPage = () => {
const InfoPage: React.FC<InfoProps> = ({ product }) => {
  const productid = product.id
  console.log(product.id)

  const [select, setSelect] = useState(0)
  const [info, setInfo] = useState<ProductStore_t[]>([])

  useEffect(() => {
    const getProducts = async () => {
      // const res = await fetch('http://localhost:8080/shops/products')
      const data = await axios.get(
        `http://localhost:8080/shops/products:${productid}`
      )
      console.log(data.data)
      console.log(data.data.productInfoList)
      // const { data } = await axios.get(`${API_URL}/shop/product`)
      setInfo(data.data.productInfoList)
      // console.log(products)
    }
    //getProducts()
  }, [])
  const getInfo = async (id: string) => {
    // const res = await fetch('http://localhost:8080/shops/products')
    const data = await axios.get(`http://localhost:8080/shops/products/${id}`)
    console.log(data.data)
    console.log(data.data.productInfoList)
    // const { data } = await axios.get(`${API_URL}/shop/product`)
    setInfo(data.data.productInfoList)
    // console.log(products)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              getInfo(product.id)
            }}
          >
            Buy
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Product Information</h4>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                {info.map((item, index) => (
                  <Button
                    variant={select === index ? 'default' : 'outline'}
                    onClick={() => {
                      setSelect(index)
                    }}
                    key={index}
                  >
                    {item.size}
                    {'   '}
                    {item.color}
                  </Button>
                ))}
              </div>
            </div>
            <Button>Add to Cart</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
export default InfoPage
