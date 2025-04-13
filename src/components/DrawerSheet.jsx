import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
  

const DrawerSheet = ({children,content, className}) => {
  return (
    <Sheet >
  <SheetTrigger asChild>{children}</SheetTrigger>
  <SheetContent side={'top'} className={cn("px-1 py-1 flex justify-self-center",className)}>

    {content}

  </SheetContent>
</Sheet>
  )
}

export default DrawerSheet