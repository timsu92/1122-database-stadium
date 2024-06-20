import Link from 'next/link'
import {
  Package,
  Settings,
  School,
  Bookmark,
  Target,
  MessageCircleCode,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'

type Props = { page: string }

function classes(page: string, ref: string): string {
  return (
    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8' +
    (page === ref ? 'bg-accent' : '')
  )
}

export function Sidebar({ page }: Props) {
  return (
    <TooltipProvider>
      <div>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="\announcement"
                  className={classes(page, 'announcement')}
                >
                  <MessageCircleCode className="h-5 w-5" />
                  <span className="sr-only">Announcement</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Announcement</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="\activity" className={classes(page, 'activity')}>
                  <Target className="h-5 w-5" />
                  <span className="sr-only">Activity</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Activity</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="\product" className={classes(page, 'product')}>
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Product</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Product</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="\reserve" className={classes(page, 'reserve')}>
                  <Bookmark className="h-5 w-5" />
                  <span className="sr-only">Reserve</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Reserve</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="\Courses" // link to course
                  className={classes(page, 'course')}
                >
                  <School className="h-5 w-5" />
                  <span className="sr-only">Course</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Course</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      </div>
    </TooltipProvider>
  )
}
