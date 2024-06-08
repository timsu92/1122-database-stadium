import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  Radio,
  RadioGroup,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Product_t } from './page'

interface ProductStore_t {
  product_id: string
  size: string
  color: string
  count: number
  _id: string
  sold: number
}
const productTemp: ProductStore_t[] = [
  {
    product_id: '1',
    size: 'XS',
    color: 'White',
    _id: '1',
    count: 5,
    sold: 0,
  },
  {
    product_id: '1',
    size: 'S',
    color: 'White',
    _id: '2',
    count: 5,
    sold: 0,
  },
  {
    product_id: '1',
    size: 'M',
    color: 'White',
    _id: '3',
    count: 5,
    sold: 0,
  },
  {
    product_id: '1',
    size: 'L',
    color: 'White',
    _id: '4',
    count: 0,
    sold: 0,
  },
]
interface InfoProps {
  open: boolean
  setOpen: (open: boolean) => void
  cart_id: string
  product: Product_t
}

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
async function addToCart(product: ProductStore_t, cart_id: string) {
  //
  //await axios.post(`${API_URL}/user/cart/add`)
}

const InfoPage: React.FC<InfoProps> = ({ open, setOpen, product, cart_id }) => {
  //const [open, setOpen] = useState(false)
  const [productInfo, setProductInfo] = useState<ProductStore_t[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductStore_t>(
    productTemp[0]
  )

  useEffect(() => {
    const getInfo = async () => {
      // const { data } = await axios.get(`${API_URL}/shop/product/${_id}`)
      // setProductInfo(data)
    }
    //getProducts()
  }, [])

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={product.imgurl[0]}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {product.name}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          ${product.price}
                        </p>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>
                        <div>
                          <fieldset
                            className="mt-10"
                            aria-label="Choose a product"
                          >
                            <legend className="text-sm font-medium text-gray-900">
                              Available Sizes and Colors
                            </legend>

                            <RadioGroup
                              value={selectedProduct}
                              onChange={setSelectedProduct}
                              className="mt-4 grid grid-cols-4 gap-4"
                            >
                              {productTemp.map((pInfo) => (
                                <Radio
                                  key={pInfo._id}
                                  value={pInfo}
                                  disabled={pInfo.count === 0}
                                  className={({ checked, focus }) =>
                                    classNames(
                                      pInfo.count > 0
                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                      focus ? 'ring-2 ring-indigo-500' : '',
                                      'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                    )
                                  }
                                >
                                  {({ checked, focus }) => (
                                    <>
                                      <span>{`${pInfo.size} - ${pInfo.color}`}</span>
                                      {pInfo.count > 0 ? (
                                        <span
                                          className={classNames(
                                            checked
                                              ? 'border-indigo-500'
                                              : 'border-transparent',
                                            focus ? 'border' : 'border-2',
                                            'pointer-events-none absolute -inset-px rounded-md'
                                          )}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                          <svg
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            stroke="currentColor"
                                          >
                                            <line
                                              x1={0}
                                              y1={100}
                                              x2={100}
                                              y2={0}
                                              vectorEffect="non-scaling-stroke"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Radio>
                              ))}
                            </RadioGroup>
                          </fieldset>
                        </div>

                        <form>
                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => {
                              addToCart(selectedProduct)
                            }}
                          >
                            Add to cart
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default InfoPage
