'use client'
import { Fragment, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Sidebar from '../components/SideBar'
import axios from 'axios'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Button } from '@/components/ui/button'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface Activity {
  id: string
  title: string
  content: string
  time: string
}

export default function ActivityPage() {
  const [Activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken') || ''
    console.log(jwtToken)
    const fetchActivities = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        }

        const start = '1989-06-01'
        const endDate = new Date()
        const end = endDate.toISOString().split('T')[0]
        const params = {
          start: start,
          end: end,
        }

        const res = await axios.get('http://localhost:8080/activities')
        setActivities(res.data)
        setLoading(false)
        console.log('Response:', res.data)
      } catch (error) {
        console.error('Error:', error)
        setError('Failed to fetch activities')
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <>
      <Sidebar page="activity" />
      <div className="h-full flex flex-col items-center justify-center m-8 text-3xl">
        <h2 className="text-6xl font-semibold m-8">Activity Page</h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-4/6"
        >
          <CarouselContent>
            {Activities.map((activity) => (
              <CarouselItem
                key={activity.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 hover:bg-slate-300">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">
                          {activity.title}
                        </h2>
                        {/* <p>{activity.content}</p> */}
                        <time className="text-sm text-gray-500">
                          {new Date(activity.time).toLocaleDateString()}
                        </time>
                        <Drawer>
                          {/* <DrawerTrigger>Open</DrawerTrigger> */}
                          <DrawerTrigger asChild>
                            <Button variant="outline">Open Activity</Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>{activity.title}</DrawerTitle>
                              <DrawerDescription>
                                {activity.content}
                              </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                              {/* <Button variant="outline">Submit</Button> */}
                              {new Date(activity.time).toLocaleDateString()}
                              <DrawerClose>
                                <Button variant="outline">Back</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}
