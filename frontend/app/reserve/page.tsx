'use client'
import { useState, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import Sidebar from '../components/SideBar'

const tableidss = [
  {
    value: '101',
    label: '101',
  },
  {
    value: '102',
    label: '102',
  },
  {
    value: '103',
    label: '103',
  },
  {
    value: '104',
    label: '104',
  },
  {
    value: '105',
    label: '105',
  },
  {
    value: '106',
    label: '106',
  },
  {
    value: '107',
    label: '107',
  },
  {
    value: '108',
    label: '108',
  },
]

interface Reserve {
  user_mail: string
  usedtableid: number
  tabledate: string
  timeidx: number
}

export default function ReservePage() {
  const [open_tableid, setOpen_tableid] = useState(false)
  const [value, setValue] = useState('')

  const [timeIndex, setTimeIndex] = useState<string>('')
  // const [tableid, setTableid] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [Reserves, setReserves] = useState<Reserve[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const jwtToken = localStorage.getItem('token')
    console.log(jwtToken)
    const fetchReserves = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `${jwtToken}`,
        }

        const start = '1989-06-01'
        const endDate = new Date()
        const end = endDate.toISOString().split('T')[0]
        const params = {
          start: start,
          end: end,
        }

        const res = await axios.get('http://localhost:8080/users/reserves', {
          headers: {
            Authorization: `${jwtToken}`,
          },
        })
        setReserves(res.data)
        setLoading(false)
        console.log('Response:', res.data)
      } catch (error) {
        console.error('Error:', error)
        setError('Failed to fetch reserves')
        setLoading(false)
      }
    }

    fetchReserves()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Loading: {error}</div>

  async function handleSubmit() {
    console.log('Date:', date)
    console.log('Time Index:', timeIndex)
    console.log('Table ID:', value)
    //console.log('test:', value)
    const jwtToken = localStorage.getItem('token')
    console.log(jwtToken)
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${jwtToken}`,
      }

      const start = '1989-06-01'
      const endDate = new Date()
      const end = endDate.toISOString().split('T')[0]
      const params = {
        start: start,
        end: end,
      }

      const res = await axios.post(
        'http://localhost:8080/users/reserves',
        {
          date: date,
          tableid: value,
          timeidx: timeIndex,
        },
        {
          headers: headers,
        }
      )
      //setReserves(res.data);
      setLoading(false)
      console.log('Response:', res.data)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to fetch reserves')
      setLoading(false)
    }
  }

  return (
    <>
      <Sidebar page="reserve" />
      <div className="h-full flex flex-col items-center justify-center m-8 text-3xl">
        <h2 className="text-6xl font-semibold m-8">Reserve Page</h2>
        <div className="flex gap-8">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Time Index"
              value={timeIndex}
              onChange={(e) => setTimeIndex(e.target.value)}
              className="mt-4 p-1 border rounded"
            />
            {/* <input
                            type="number"
                            placeholder="Table ID"
                            value={tableid !== undefined ? tableid : ''}
                            onChange={(e) => setTableid(parseInt(e.target.value))}
                            className="mt-4 p-2 border rounded"
                        /> */}
            <Popover open={open_tableid} onOpenChange={setOpen_tableid}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open_tableid}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? tableidss.find((tableids) => tableids.value === value)
                        ?.label
                    : 'choose table...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search tableids..." />
                  <CommandList>
                    <CommandEmpty>No tableids found.</CommandEmpty>
                    <CommandGroup>
                      {tableidss.map((tableids) => (
                        <CommandItem
                          key={tableids.value}
                          value={tableids.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? '' : currentValue)
                            setOpen_tableid(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === tableids.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {tableids.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button onClick={handleSubmit} className="mt-4">
              Submit
            </Button>
          </div>
        </div>
        <div className="m-8">
          <Drawer>
            <DrawerTrigger>
              <Button variant="outline">Edit Profile</Button>
            </DrawerTrigger>
            <DrawerContent className="items-center">
              {/* <DrawerHeader>
                                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                <DrawerDescription>This action cannot be undone.</DrawerDescription>
                            </DrawerHeader> */}
              <div className="items-center justify-center">
                <ScrollArea className="h-96 w-full rounded-md border mt-4">
                  <div className="p-4">
                    {Reserves.map((reserve, index) => (
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
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  )
}
