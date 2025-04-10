import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const Modal = ({trigger, title, content, open, isOpen}) => {
  return (
    <Dialog open={open} onOpenChange={isOpen}>
        {trigger&&(
            <>
            <DialogTrigger>{trigger}</DialogTrigger>
            </>
        )}
  <DialogContent className={'dark:bg-gray-900 border-none bg-white dark:text-white'}>
    <DialogHeader>
      <DialogTitle className={'text-center'}>{title}</DialogTitle>
    </DialogHeader>
    {content}
  </DialogContent>
</Dialog>
  )
}

export default Modal