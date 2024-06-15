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
import { buttonVariants } from "@/components/ui/button"
const courses = [
  {
    course: "Course001",
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
    <>
      <h1>Courses page</h1>
      <br/>
      <h2>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </h2>
      <br/>
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
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.course}>
              <TableCell className="font-medium " >{course.course}</TableCell>
              <TableCell className="text-center">{course.startDate}</TableCell>
              <TableCell className="text-center">{course.weekDay}</TableCell>
              <TableCell className="text-center">{course.timeSlot}</TableCell>
              <TableCell className="text-center">{course.weeks}</TableCell>
              <TableCell className="text-center">{course.coachs.map((coach, index) => {
                if (index != course.coachs.length - 1) return `${coach}, `
                else return `${coach}`
              })}
              </TableCell>
              <TableCell className="text-center">{course.courseType}</TableCell>
              <TableCell className="text-right">{course.Price}</TableCell>
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