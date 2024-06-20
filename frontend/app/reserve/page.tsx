'use client'
import { useState, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Sidebar } from '../sidebar/page'

interface Reserve {
  user_mail: string
  usedtableid: number
  tabledate: string
  timeidx: number
}

const reserves: Reserve[] = [
  {
    user_mail: 'dev@dev.com',
    usedtableid: 5,
    tabledate: '2024-06-01T16:00:00.000Z',
    timeidx: 5,
  },
]

export default function ReservePage() {
  const [timeIndex, setTimeIndex] = useState<string>('')
  const [tableid, setTableid] = useState<number | undefined>()
  const [date, setDate] = useState<Date | undefined>(new Date())
  // const [reserves, setReserves] = useState<Reserve[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //     const fetchReserves = async () => {
  //         try {
  //             const response = await fetch('/api/reserves');
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //             }
  //             const data = await response.json();
  //             setReserves(data);
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

  //     fetchReserves();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  const handleSubmit = () => {
    console.log('Date:', date)
    console.log('Time Index:', timeIndex)
    console.log('Table ID:', tableid)
  }

  return (
    <>
      <Sidebar page='reserve' />
      <div className="h-full flex flex-col items-center justify-center text-3xl">
        Reserve Page
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <input
          type="text"
          placeholder="Time Index"
          value={timeIndex}
          onChange={(e) => setTimeIndex(e.target.value)}
          className="mt-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Table ID"
          value={tableid !== undefined ? tableid : ''}
          onChange={(e) => setTableid(parseInt(e.target.value))}
          className="mt-4 p-2 border rounded"
        />
        <Button onClick={handleSubmit} className="mt-4">
          Submit
        </Button>
        <ScrollArea className="h-96 w-4/6 rounded-md border mt-4">
          <div className="p-4">
            {reserves.map((reserve, index) => (
              <div key={index} className="text-sm">
                <h1 className="text-lg">{reserve.user_mail}</h1>
                <p className="text-slate-400">{reserve.tabledate}</p>
                <div>Table ID: {reserve.usedtableid}</div>
                <div>Time Index: {reserve.timeidx}</div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
