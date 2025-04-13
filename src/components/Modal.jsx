import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const Modal = ({trigger, title, content, open, isOpen, onClose}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenChange = (open) => {
    setIsModalOpen(open);
    
    // If the modal is closing (changing from open to closed)
    if (open === false) {
      // Perform your desired action here
     
      console.log('Modal closed action triggered');
      if(onClose){

        onClose();
      }
    }
  };
  useEffect(()=>{
    setIsModalOpen(open)
  },[open])
  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange} >
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