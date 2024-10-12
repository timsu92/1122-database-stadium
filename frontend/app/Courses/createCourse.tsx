'use client';

import React from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PlusCircle } from 'lucide-react';

export interface addProps {
  jwtToken: string
}

const NewCourse: React.FC<addProps> = ({ jwtToken }) => {
  // console.log(jwtToken)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    const formData = Object.fromEntries(form.entries())
    // console.log('Form Data:', formData)
    const data = {
      title: formData.title as string,
      timeSlot: parseInt(formData.timeSlot as string),
      weekday: formData.weekday as string,
      courseType: formData.courseType as string,
      duration: parseInt(formData.duration as string),
      weeks: parseInt(formData.weeks as string),
      max: parseInt(formData.max as string),
      content: formData.content as string,
      startDay: formData.startDay as string,
      fee: parseInt(formData.fee as string),
      timeIdx: (formData.timeIdx as string).split(',').map(Number),
      usedTableId: (formData.usedTableId as string).split(',').map(Number),
      coachEmail: (formData.coachEmail as string).split(',') // assuming multiple emails are comma-separated
    }
    try {
      const response = await axios.post(
        'http://localhost:8080/courses/', // 替换为你的API端点
        // formData,
        data,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )

      if (response.data.message === 'Success') {
        alert('New course created')
      } else if (response.data.message) {
        alert('Error: ' + response.data.message)
      } else {
        alert('Error: ' + response.data)
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
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Course</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]" >
        <SheetHeader>
          <SheetTitle>Create New Course</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <ScrollArea className="h-[600px] w-[340px] rounded-md border p-4">
            <div className="grid gap-5 py-4">
              <div className="grid grid-cols-4 items-center gap-5">
                <Label htmlFor="title" className="text-center">Course Title</Label>
                <Input id="title" name="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDay" className="text-center">Start Date</Label>
                <Input id="startDay" name="startDay" placeholder="YYYY-MM-DD" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weekday" className="text-center">Weekday</Label>
                <Input id="weekday" name="weekday" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="timeSlot" className="text-center">Time Slot</Label>
                <Input id="timeSlot" name="timeSlot" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weeks" className="text-center">Weeks</Label>
                <Input id="weeks" name="weeks" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="coachEmail" className="text-center">Coach mails</Label>
                <Input id="coachEmail" name="coachEmail" className="col-span-3" placeholder='format: dev@dev.com,...'/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="courseType" className="text-center">Type</Label>
                <Input id="courseType" name="courseType" className="col-span-3" placeholder='group or private' />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fee" className="text-center">Fee</Label>
                <Input id="fee" name="fee" className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-center">Duration</Label>
                <Input id="duration" name="duration" className="col-span-3" placeholder='2(hr)' />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="timeIdx" className="text-center">TimeIdx</Label>
                <Input id="timeIdx" name="timeIdx" className="col-span-3" placeholder='format like: 0,1,...' />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-center">Content</Label>
                <Input id="content" name="content" className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="usedTableId" className="text-center">useTableId</Label>
                <Input id="usedTableId" name="usedTableId" className="col-span-3" placeholder='format: 0,1,...' />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="max" className="text-center">Max</Label>
                <Input id="max" name="max" className="col-span-3"  />
              </div>

            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">New</Button>
              </SheetClose>
            </SheetFooter>
          </ScrollArea>

        </form>
      </SheetContent>
    </Sheet>
  );
};

export default NewCourse;

