'use client'
import React, { useState } from 'react'
import axios from 'axios'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// 定义 ProductStore 的接口
export interface ProductStore_t {
  product_id: string
  size: string
  color: string
  count: number
  id: string
  sold: number
}

// 定义组件属性接口
interface EditProductProps {
  jwtToken: string
  productId: string
  //initialInfoData: Product_t[]
}

const EditInfo: React.FC<EditProductProps> = ({
  jwtToken,
  productId,
  //initialInfoData,
}) => {
  // 初始化状态
  const [productStores, setProductStores] = useState<ProductStore_t[]>([])
  const [info, setInfo] = useState<ProductStore_t[]>([])

  const [newStore, setNewStore] = useState<ProductStore_t>({
    product_id: productId,
    size: '',
    color: '',
    count: 0,
    id: '',
    sold: 0,
  })
  const getInfo = async (id: string) => {
    const data = await axios.get(`http://localhost:8080/shops/products/${id}`)
    setProductStores(data.data.productInfoList)
    // console.log(products)
  }

  // 处理已有 ProductStore 信息的更改
  const handleStoreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    storeId: string
  ) => {
    const { name, value } = e.target
    setProductStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, [name]: value } : store
      )
    )
  }

  // 提交已有 ProductStore 信息的更改
  const handleStoreSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    storeId: string
  ) => {
    e.preventDefault()
    const store = productStores.find((store) => store.id === storeId)
    if (!store) return

    try {
      const response = await axios.patch(
        `http://localhost:8080/shops/products/${store.product_id}/${storeId}`,
        store,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )

      if (response.data.message === 'Update successfully.') {
        alert('Product Info updated successfully')
      }
    } catch (error) {
      console.error('There was a problem with the axios request:', error)
      alert('Error: ' + error)
    }
  }

  // 处理新增 ProductStore 信息的更改
  const handleNewStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewStore({ ...newStore, [name]: value })
  }

  // 提交新增 ProductStore 信息
  const handleNewStoreSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `http://localhost:8080/shops/products/${productId}`,
        newStore,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )

      if (response.data.message === 'Success') {
        alert('New product store added successfully')
        setProductStores([...productStores, newStore])
        setNewStore({
          product_id: '',
          size: '',
          color: '',
          count: 0,
          id: '',
          sold: 0,
        })
      } else {
        alert('Error: ' + response.data.message)
      }
    } catch (error) {
      console.error('There was a problem with the axios request:', error)
      alert('Error: ' + error)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            getInfo(productId)
          }}
        >
          Edit Product Stores
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Product Stores</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[700px] w-[350px] rounded-md border p-4">
          <div className="flex flex-col">
            {/* 编辑已有的 ProductStore 信息 */}
            {productStores.map((store) => (
              <form
                key={store.id}
                onSubmit={(e) => handleStoreSubmit(e, store.id)}
                className="mb-4"
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`size-${store.id}`} className="text-right">
                      Size
                    </Label>
                    <Input
                      id={`size-${store.id}`}
                      name="size"
                      className="col-span-3"
                      value={store.size}
                      onChange={(e) => handleStoreChange(e, store.id)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`color-${store.id}`} className="text-right">
                      Color
                    </Label>
                    <Input
                      id={`color-${store.id}`}
                      name="color"
                      className="col-span-3"
                      value={store.color}
                      onChange={(e) => handleStoreChange(e, store.id)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`count-${store.id}`} className="text-right">
                      Count
                    </Label>
                    <Input
                      id={`count-${store.id}`}
                      name="count"
                      type="number"
                      className="col-span-3"
                      value={store.count}
                      onChange={(e) => handleStoreChange(e, store.id)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`sold-${store.id}`} className="text-right">
                      Sold
                    </Label>
                    <Input
                      id={`sold-${store.id}`}
                      name="sold"
                      type="number"
                      className="col-span-3"
                      value={store.sold}
                      onChange={(e) => handleStoreChange(e, store.id)}
                    />
                  </div>
                </div>

                <SheetFooter>
                  <Button type="submit">Save</Button>
                </SheetFooter>
              </form>
            ))}

            {/* 添加新的 ProductStore 信息 */}
            <form onSubmit={handleNewStoreSubmit} className="mt-4">
              <SheetHeader>
                <SheetTitle>Add New Product Store</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-size" className="text-right">
                    Size
                  </Label>
                  <Input
                    id="new-size"
                    name="size"
                    className="col-span-3"
                    value={newStore.size}
                    onChange={handleNewStoreChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-color" className="text-right">
                    Color
                  </Label>
                  <Input
                    id="new-color"
                    name="color"
                    className="col-span-3"
                    value={newStore.color}
                    onChange={handleNewStoreChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-count" className="text-right">
                    Count
                  </Label>
                  <Input
                    id="new-count"
                    name="count"
                    type="number"
                    className="col-span-3"
                    value={newStore.count}
                    onChange={handleNewStoreChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-sold" className="text-right">
                    Sold
                  </Label>
                  <Input
                    id="new-sold"
                    name="sold"
                    type="number"
                    className="col-span-3"
                    value={newStore.sold}
                    onChange={handleNewStoreChange}
                  />
                </div>
              </div>

              <SheetFooter>
                <Button type="submit">Add</Button>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default EditInfo
