'use client'
import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'
import CartPage from './cart'
import InfoPage from './info'

export interface Product_t {
  _id: string
  name: string
  brand: string
  price: number
  desc: string
  imgurl: string[]
}
const productTemp: Product_t[] = [
  {
    _id: '1',
    name: 'Earthen Bottle',
    brand: '',
    price: 48,
    desc: '',
    imgurl: [
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    ],
  },
  {
    _id: '2',
    name: 'Machined Mechanical Pencil',
    brand: '',
    price: 200,
    desc: '',
    imgurl: [
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    ],
  },
  {
    _id: '3',
    name: 'Earthen Bottle',
    brand: '',
    price: 100,
    desc: '',
    imgurl: [
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    ],
  },
  {
    _id: '4',
    name: 'Machined Mechanical Pencil',
    brand: '',
    price: 450,
    desc: '',
    imgurl: [
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
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

export default function Product() {
  const [open, setOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [products, setProducts] = useState<Product_t[]>([])
  const [selectProduct, setSelectProduct] = useState<Product_t>(productTemp[0])

  useEffect(() => {
    const getProducts = async () => {
      // const { data } = await axios.get(`${API_URL}/shop/product`)
      // setProducts(data)
    }
    getProducts()
  }, [])
  return (
    <>
      <h1>Product page</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>

      <button onClick={() => setOpen(!open)}>
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          open cart
        </span>
      </button>
      <CartPage open={open} setOpen={setOpen} cart_id={''} />
      <InfoPage open={showInfo} setOpen={setShowInfo} product={selectProduct} cart_id={''}/>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productTemp.map((product) => (
              <a key={product._id} href={'#'} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imgurl[0]}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
                <button
                  onClick={() => {
                    setShowInfo(!showInfo)
                    setSelectProduct(product)
                  }}
                >
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    show info
                  </span>
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
