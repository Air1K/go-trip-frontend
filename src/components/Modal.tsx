import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactElement } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';

interface ModalProps {
  leftIconHeader?: string;
  header?: string;
  trigger?: JSX.Element;
  main: ReactElement;
  footerContent?: JSX.Element;
  className?: string;
  open?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  actionBtnText?: string;
  disabled?: boolean;
  loading?: boolean;
  isError?: boolean;
  errorText?: string;
}

const Modal = ({
  leftIconHeader,
  header,
  main,
  footerContent,
  trigger,
  className,
  open,
  onClose,
  onSubmit,
  actionBtnText,
  disabled,
  loading,
  isError = false,
  errorText,
}: ModalProps) => (
  <Dialog
    open={open}
    onOpenChange={(isOpen) => {
      if (!isOpen && onClose) {
        onClose();
      }
    }}
  >
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent
      className={`bg-card overflow-y-auto !rounded-t-lg mobile:!rounded-b-3xl mobile:!max-w-modal gap-0 p-0 border-none max-mobile:bottom-0 max-mobile:top-auto max-mobile:translate-y-0 max-h-[91vh] rich-text-display ${className}`}
    >
      <DialogHeader>
        <div className='flex border-b bg-modal-foreground sticky top-0 justify-between items-center gap-8 p-8'>
          {leftIconHeader && (
            <div className=''>
              <img src={leftIconHeader} width={32} height={32} alt='' />
            </div>
          )}
          <DialogTitle className='text-accent-foreground-header font-medium text-xl leading-6 tracking-tight text-left'>
            {header}
          </DialogTitle>
          <DialogClose className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
            <X />
          </DialogClose>
        </div>
      </DialogHeader>
      <div className='px-8 !m-0 py-4 text-standard text-xl leading-6 tracking-tight text-left'>
        {main}
        <Alert hidden={!isError} className='mt-4' variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{errorText}</AlertDescription>
        </Alert>
      </div>
      <DialogFooter className='grid grid-flow-col auto-cols-fr gap-2 p-8 border-t'>
        {footerContent ? (
          footerContent
        ) : (
          <>
            <DialogClose className={cn(buttonVariants({ variant: 'secondary' }))}>Отмена</DialogClose>
            <Button
              onClick={onSubmit}
              className={cn(buttonVariants({ variant: 'default' }))}
              disabled={disabled || loading}
            >
              {actionBtnText ? actionBtnText : 'Сохранить'}
            </Button>
          </>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default Modal;
