'use client'
import { Fragment, useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NewCourse from './createCourse'
import Update from './updateCourse'

const courses = [
  {
    course: "Course001",
    courseId: "1",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$250.00",
    coachs: ["Sebastian", "Melody"]
  },
  {
    course: "Course002",
    courseId: "2",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$150.00",
    coachs: ["Sebastian", "Melody"]
  },
  {
    course: "Course003",
    courseId: "3",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$350.00",
    coachs: ["Sebastian", "Melody"]
  },
  {
    course: "Course004",
    courseId: "4",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$450.00",
    coachs: ["Sebastian", "Melody"]
  },
  {
    course: "Course005",
    courseId: "5",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$550.00",
    coachs: ["Sebastian", "Kevin"]
  },
  {
    course: "Course006",
    courseId: "6",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$200.00",
    coachs: ["Sebastian", "Melody"]
  },
  {
    course: "Course007",
    courseId: "7",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$300.00",
    coachs: ["Sebastian", "Melody"]
  },
  {
    course: "Course008",
    courseId: "8",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$300.00",
    coachs: ["Sebastian", "Melody"]
  },
  {
    course: "Course009",
    courseId: "9",
    startDate: "2023-06-21",
    timeSlot: "3:00-4:00",
    weekDay: "Monday",
    weeks: 4,
    courseType: "group",
    content: "",
    Price: "$300.00",
    coachs: ["Sebastian", "Melody"]
  },
]
export default function Courses() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"></header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="ml-auto flex items-center gap-2">
            <NewCourse/>
          </div>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of recent courses.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Course</TableHead>
                    <TableHead className="text-center">Start Date</TableHead>
                    <TableHead className="text-center">Week Day</TableHead>
                    <TableHead className="text-center">Time Slot</TableHead>
                    <TableHead className="text-center">Weeks</TableHead>
                    <TableHead className="text-center">coachs</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-right">Update Course</TableHead>
                    <TableHead className="text-right">Delete Course</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.courseId}>
                      <TableCell className="font-medium " >{course.course}</TableCell>
                      <TableCell className="text-center">{course.startDate}</TableCell>
                      <TableCell className="text-center">{course.weekDay}</TableCell>
                      <TableCell className="text-center">{course.timeSlot}</TableCell>
                      <TableCell className="text-center">{course.weeks}</TableCell>
                      <TableCell className="text-center">
                        {course.coachs.join(', ')}
                      </TableCell>
                      <TableCell className="text-center">{course.courseType}</TableCell>
                      <TableCell className="text-center">{course.Price}</TableCell>
                      <TableCell className="text-right">
                        <Update/>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive"
                          onClick={() => {
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}