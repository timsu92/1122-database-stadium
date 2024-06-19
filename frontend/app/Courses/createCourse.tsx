'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
const NewCourse = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    // const response = await axios.post(`${API_URL}/product/create`, form)
    // console.log(response)
    // if (response.data.message === 'New product created') {
    //   alert('New product created')
    //   window.location.href = '/product'
    //   return
    // } else {
    //   alert('Error')
    //   return
    // }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            New Course
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Course</SheetTitle>
        </SheetHeader>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="name" className="text-center">
                Course Name
              </Label>
              <Input id="name" value="new name" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start Date" className="text-center">
                Start Date
              </Label>
              <Input id="startDate" placeholder="start Date" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="week day" className="text-center">
                Week Day
              </Label>
              <Input id="weekday" value="Monday" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor=" Time Slot" className="text-center">
                Time Slot
              </Label>
              <Input id=" Timeslot" value=" Time Slot" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Weeks" className="text-center">
                Weeks
              </Label>
              <Input id="Weeks" value="Weeks" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Coaches" className="text-center">
                Coaches
              </Label>
              <Input id="Coaches" value="Coaches" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Type" className="text-center">
                Type
              </Label>
              <Input id="Type" value="private or group" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Price" className="text-center">
                Price
              </Label>
              <Input id="Price" value="Price" className="col-span-3" />
            </div>

          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Submit</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
export default NewCourse
