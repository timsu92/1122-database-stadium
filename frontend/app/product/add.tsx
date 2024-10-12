'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { PlusCircle } from 'lucide-react'

export interface addProps {
  jwtToken: string
}
const NewProduct: React.FC<addProps> = ({ jwtToken }) => {
  // const jwtToken = localStorage.getItem('jwtToken') || '' // 获取JWT Token

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const formData = Object.fromEntries(form.entries())

    // 在控制台打印输入值
    console.log('Form Data:', formData)

    try {
      const response = await axios.post(
        'http://localhost:8080/shops/products/', // 替换为你的API端点
        formData,
        {
          headers: {
            Authorization: `${jwtToken}`, // 在请求头中添加JWT
          },
        }
      )

      if (response.data.message === 'Success') {
        alert('New product created')
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
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            New Product
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Product</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input id="brand" name="brand" className="col-span-3" />
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
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="desc" className="text-right">
                Description
              </Label>
              <Input id="desc" name="desc" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Size
              </Label>
              <Input id="size" name="size" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Input id="color" name="color" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sold" className="text-right">
                Sold
              </Label>
              <Input
                id="sold"
                name="sold"
                type="number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="count" className="text-right">
                Count
              </Label>
              <Input
                id="count"
                name="count"
                type="number"
                className="col-span-3"
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

export default NewProduct
