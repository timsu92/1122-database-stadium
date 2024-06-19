'use client'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"


import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    date: z.date().optional(),
    timeIndex: z.string(),
    tableid: z.number(),
});

interface Reserve {
    user_mail: string,
    usedtableid: number,
    tabledate: string,
    timeidx: number
}

const Reserves: Reserve[] = [
    {
        "user_mail": "dev@dev.com",
        "usedtableid": 5,
        "tabledate": "2024-06-01T16:00:00.000Z",
        "timeidx": 5
    }
]


export default function ActivityPage() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const [timeIndex, setTimeid] = useState<string>('');
    const [tableid, setTableid] = useState<number | undefined>();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })


        try {
            const response = await fetch('http://localhost:8080/users/reserves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('API response:', responseData);
            // 根據需要處理 API 回應
        } catch (error) {
            console.error('API request failed:', error);
            // 根據需要處理錯誤
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full flex flex-col items-center justify-center text-3xl">
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (

                        <FormItem className="h-full flex flex-col items-center justify-center text-3xl gap-8">
                            Reserve Table
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Please select the date you want to reserve a table
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <input
                        type="text"
                        placeholder="Enter Time INDEX"
                        value={timeIndex}
                        onChange={(e) => setTimeid(e.target.value)}
                    />
                </FormItem>

                <FormItem>
                    <input
                        type="number"
                        placeholder="Enter Table ID"
                        value={tableid}
                        onChange={(e) => setTableid(parseInt(e.target.value))}
                    />
                </FormItem>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};