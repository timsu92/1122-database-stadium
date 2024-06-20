'use client'
import { Fragment, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Sidebar } from '../sidebar/page'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Activity {
  id: string,
  title: string,
  content: string,
  time: string,
}

const Activities: Activity[] = [
  {
    id: "1",
    title: 'Yoga Session',
    content: 'Join us for a morning yoga session to relax and rejuvenate.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "2",
    title: 'Cooking Class',
    content: 'Learn to cook delicious meals with our expert chef.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "3",
    title: 'Art Workshop',
    content: 'Unleash your creativity in our art workshop.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "4",
    title: 'Tech Talk',
    content: 'Join our tech talk to stay updated on the latest trends in technology.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "5",
    title: 'Music Concert',
    content: 'Enjoy live music from our talented local bands.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "6",
    title: 'Dance Class',
    content: 'Get moving with our energetic dance class.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "7",
    title: 'Book Club',
    content: 'Join our book club to discuss the latest bestsellers.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "8",
    title: 'Fitness Bootcamp',
    content: 'Push your limits with our intense fitness bootcamp.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "9",
    title: 'Gardening Workshop',
    content: 'Learn the basics of gardening in our hands-on workshop.',
    time: '2024-06-15T00:00:00Z'
  },
  {
    id: "10",
    title: 'Photography Walk',
    content: 'Capture stunning photos in our guided photography walk.',
    time: '2024-06-15T00:00:00Z'
  }
]

async function get_all_activity() {
  const res = await fetch('http://localhost:3000/api/activity');
  const activities: Activity[] = await res.json();

  return activities
}

export default function ActivityPage() {
  // const [Activities, setActivities] = useState<Activity[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //     const fetchActivities = async () => {
  //         try {
  //             const data = await get_all_activity();
  //             setActivities(data);
  //         } catch (error: unknown) {
  //             if (error instanceof Error) {
  //                 setError(error.message);
  //             } else {
  //                 setError('An unknown error occurred');
  //             }
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     fetchActivities();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  return (
    <>
      <Sidebar />
      <div className='h-full flex flex-col items-center justify-center m-8 text-3xl'>
        <h2 className='text-6xl font-semibold m-8'>Activity Page</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-4/6"
        >
          <CarouselContent>
            {Activities.map((activity) => (
              <CarouselItem key={activity.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 hover:bg-slate-300">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className='flex flex-col'>
                        <h2 className="text-xl font-semibold">{activity.title}</h2>
                        {/* <p>{activity.content}</p> */}
                        <time className="text-sm text-gray-500">{new Date(activity.time).toLocaleDateString()}</time>
                        <Drawer>
                          {/* <DrawerTrigger>Open</DrawerTrigger> */}
                          <DrawerTrigger asChild>
                            <Button variant="outline">Open Activity</Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>{activity.title}</DrawerTitle>
                              <DrawerDescription>{activity.content}</DrawerDescription>
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

  );
};