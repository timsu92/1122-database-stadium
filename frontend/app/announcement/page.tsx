'use client'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Announcement {
    id: string,
    title: string,
    content: string,
    time: string,
}

const Announcements: Announcement[] = [
    {
        id: "1",
        title: 'New Yoga Class',
        content: 'We are excited to announce a new Yoga class starting next Monday.',
        time: '2024-06-15T00:00:00Z'
    },
    {
        id: "2",
        title: 'Holiday Schedule',
        content: 'The gym will be closed on July 4th for Independence Day.',
        time: '2024-06-15T00:00:00Z'
    },
    {
        id: "3",
        title: 'New Equipment',
        content: 'We have added new treadmills and ellipticals to the cardio room.',
        time: '2024-06-15T00:00:00Z'
    },
    {
        id: "4",
        title: 'Member of the Month',
        content: 'Congratulations to Jane Doe for being the member of the month!',
        time: '2024-06-15T00:00:00Z'
    },
    {
        id: "5",
        title: 'Workshop: Nutrition Basics',
        content: 'Join us for a workshop on nutrition basics next Saturday.',
        time: '2024-06-15T00:00:00Z'
    },
    {
        id: "6",
        title: 'Extended Hours',
        content: 'We are extending our hours on weekdays until 10 PM.',
        time: '2024-06-15T00:00:00Z'
    },
    {
        id: "7",
        title: 'Personal Training Discount',
        content: 'Get 20% off personal training sessions this month.',
        time: '2024-06-15T00:00:00Z'
    },
    {
        id: "8",
        title: 'Upcoming Maintenance',
        content: 'The pool will be closed for maintenance next Tuesday.',
        time: '2024-06-15T00:00:00Z'
    }
];

// const announcement_tags = Announcements.map((announcement, index) => ({
    
// }));

export default function ActivityPage() {
    return (
        <>
            <div className='h-full flex flex-col items-center justify-center text-3xl'>
                Announcement Page
                <ScrollArea className="h-96 w-4/6 rounded-md border">
                    <div className="p-4">
                        {/* <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4> */}
                        {Announcements.map((announcement) => (
                            <>
                                <div key={announcement.id} className="text-sm">
                                    <h1 className="text-lg">{announcement.title}</h1>
                                    <p className="text-slate-400">{announcement.time}</p>
                                    <div>
                                        {announcement.content}
                                    </div>
                                </div>
                                <Separator className="my-2" />
                            </>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </>

    );
};