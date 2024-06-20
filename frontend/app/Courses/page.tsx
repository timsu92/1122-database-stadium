'use client';
import { useState, useEffect } from 'react';
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewCourse from './createCourse';
import Update from './updateCourse';
import axios from 'axios';
import UserCourseList from './userCourseList';

export interface Icourse {
  id: string;
  title: string;
  timeSlot: number;
  weekday: string;
  courseType: string;
  duration: number;
  weeks: number;
  max: number;
  content: string;
  startDay: string;
  fee: number;
  timeIdx: number[];
  usedTableId: number[];
  coachEmail: string[];
}

export type SubUserType = {
  mail: string
  name: string
}


export default function Courses() {
  const [jwtToken, setJwtToken] = useState<string>('');
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
    const getJwt = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/auth/login',
          { email: 'dev@dev.com', password: '123' }
        );
        if (response.data.jwtToken) {
          setJwtToken(response.data.jwtToken)
        } else {
          alert('Error: ' + response.data)
        }
      } catch (error) {
        console.error('There was a problem with the axios request:', error);
        alert('Error: ' + error)
      }
    };
    getJwt()
  }, [])

  useEffect(() => {
    const fetchCourses = async () => {
      if (!jwtToken) return
      try {
        const response = await axios.get('http://localhost:8080/courses', {
          headers: { Authorization: jwtToken }
        })
        if (response.status === 200) {
          setCourses(response.data)
        } else {
          alert('Error fetching courses')
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
        alert('Error fetching courses')
      }
    }
    if (jwtToken) {
      fetchCourses()
    }
  }, [jwtToken])

  async function deleteCourse(id: string) {
    const res = await axios.delete(`http://localhost:8080/courses/${id}`,
      {
        headers: { Authorization: jwtToken }
      })
    if (res.data.message == 'Delete course successfully') {
      alert('Delete course successfully')
    } else {
      console.log(res)
    }
  }

  async function handleAddCourse(subUser: string, courseId: string) {
    const body = {
      course_id: courseId,
      user_name: subUser,
    }
    const res = await axios.post('http://localhost:8080/users/courses/add',
    body,
    {
      headers: { Authorization: jwtToken }
    })
    if (res.status == 200) {
      alert('Enroll course successfully')
    } else {
      console.log(res)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"></header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="ml-auto flex items-center gap-2">
            <NewCourse jwtToken={jwtToken} />
            <UserCourseList subUserNmae='Sebastian' jwtToken={jwtToken} />
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
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Enroll</TableHead>
                    <TableHead className="text-center">Update</TableHead>
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
                      <TableCell className="text-center">{course.weeks}</TableCell>
                      <TableCell className="text-center">{course.courseType}</TableCell>
                      <TableCell className="text-center">{`$${course.fee}`}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" onClick={() => { handleAddCourse('Sebastian',course.id) }}>Enroll</Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <Update />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" onClick={() => { deleteCourse(course.id) }}>
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
  );
}
