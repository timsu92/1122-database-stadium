'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Product_t } from './page'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import axios from 'axios'

interface EditProductProps {
  jwtToken: string
  initialProductData: Product_t
}
const EditProduct: React.FC<EditProductProps> = ({
  jwtToken,
  initialProductData,
}) => {
  //const jwtToken = localStorage.getItem('jwtToken') || ''

  // 初始化状态
  const [name, setName] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [desc, setDesc] = useState<string>('')

  // 使用effect来初始化表单数据
  useEffect(() => {
    if (initialProductData) {
      setName(initialProductData.name || '')
      setBrand(initialProductData.brand || '')
      setPrice(initialProductData.price || 0)
      setDesc(initialProductData.desc || '')
    }
  }, [initialProductData])

  // 表单提交处理函数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedProduct = {
      id: initialProductData.id,
      name,
      brand,
      price,
      desc,
      imgurl: initialProductData.imgurl, // 假设不更新图片URL
    }

    console.log('Updated Product Data:', updatedProduct)

    try {
      const response = await axios.patch(
        `http://localhost:8080/shops/products/${initialProductData.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )

      if (response.data.message === 'Update successfully.') {
        alert('Product updated successfully')
      }
    } catch (error) {
      console.error('There was a problem with the axios request:', error)
      alert('Error: ' + error)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                className="col-span-3"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                className="col-span-3"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="desc" className="text-right">
                Description
              </Label>
              <Input
                id="desc"
                name="desc"
                className="col-span-3"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>

          <SheetFooter>
            <Button type="submit">Submit</Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
export default EditProduct
