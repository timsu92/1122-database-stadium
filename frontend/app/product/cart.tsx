'use clinet'
import React, { useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

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

const CartPage: React.FC<CartProps> = ({ open, setOpen, cart_id }) => {
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
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-50 bg-opacity-50 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <DialogTitle className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {productTemp.map((product, index) => (
                                <li key={index} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.imgurl}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{product.name}</h3>
                                        <p className="ml-4">
                                          $ {product.price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}{' '}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.size}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        count: {product.count}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>$262.00</p>
                        </div>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CartPage
