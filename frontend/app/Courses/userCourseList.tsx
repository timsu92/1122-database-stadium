'use client'
import { Button } from '@/components/ui/button'
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icourse } from './page';
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface UserCourseListprop {
  subUserNmae: string
  jwtToken: string
}

const UserCourseList: React.FC<UserCourseListprop> = ({ subUserNmae, jwtToken }) => {
  const [courses, setCourses] = useState<Icourse[]>([
    {
      id: 'loading...',
      title: 'loading...',
      timeSlot: 0,
      weekday: 'loading...',
      courseType: 'loading...',
      duration: 0,
      weeks: 0,
      max: 0,
      content: 'loading...',
      startDay: 'loading...',
      fee: 0,
      timeIdx: [0],
      usedTableId: [0],
      coachEmail: ['loading...',],
    }
  ])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/courses/list', {
          headers: { Authorization: jwtToken }
        })
        if (response.status === 200) {
          setCourses(response.data)
        } else if (response.status === 400) {
          console.log('Don\'t have any course')
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
        // alert('Error fetching courses')
      }
    }
    if (jwtToken) {
      fetchCourses()
    }
  }, [jwtToken])

  // async function deleteCourse(subUser:string,courseId: string) {
  //   const body={
  //     course_id:courseId,
  //     subUser:'Sebastian'
  //   }
  //   const res = await axios.delete(`http://localhost:8080/users/courses/remove/`,
  //     body,
  //     {
  //       headers: { Authorization: jwtToken },
  //     })
  //   if (res.data.message == 'Delete course successfully') {
  //     alert('Delete course successfully')
  //   } else {
  //     console.log(res)
  //   }
  // }

  return (

    (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">User Courses</Button>
        </SheetTrigger>
        <SheetContent className="sm:w-[500px] !max-w-[500px] !w-[500px]" >
          <SheetHeader>
            <SheetTitle>User Course</SheetTitle>
          </SheetHeader>
          {courses[0].id == 'loading...' ? (
            <>
              <br />
              <SheetHeader>
                <SheetTitle>Still don't have any course.</SheetTitle>
              </SheetHeader>
            </>
          )
            : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Course</TableHead>
                    <TableHead className="text-center">Start Date</TableHead>
                    <TableHead className="text-center">Week Day</TableHead>
                    <TableHead className="text-center">Time Slot</TableHead>
                    <TableHead className="text-right">Delete Course</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell className="text-center">{course.startDay}</TableCell>
                      <TableCell className="text-center">{course.weekday}</TableCell>
                      <TableCell className="text-center">{course.timeSlot}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" onClick={() => { }}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>)}
          <SheetFooter>
            {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>))
}

export default UserCourseList
