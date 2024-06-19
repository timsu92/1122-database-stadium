'use client'
import Link from 'next/link'
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
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  return (
    <>
      <h1>Courses page</h1>
      <br />
      <Button onClick={() => { router.push('/') }} className="absolute right-1 top-5">
        Create Course
      </Button>
      <br />
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
                <Button variant="secondary"
                  onClick={() => {
                  }}
                >
                  Update
                </Button>
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
        <TableFooter>
          {/* <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
        </TableFooter>
      </Table>
    </>
  )
}