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

const Update = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Course</SheetTitle>
          <SheetDescription>
            Make changes to the Course Info here. Click save when done.
          </SheetDescription>
        </SheetHeader>
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
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Update
