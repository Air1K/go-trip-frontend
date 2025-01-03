import { FC, HTMLAttributes } from 'react';
// import Next from '@/assets/icon/next.svg?react';
interface ItemProfileInfoProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  value?: string;
}

const ItemProfileInfo: FC<ItemProfileInfoProps> = ({ name, value }) => {
  if (value === undefined) return null;
  return (
    <div className='flex gap-[6px] justify-between items-center py-3 border-t border-ghost-hover first:border-0 text-left w-full'>
      <div className='grid gap-[2px]'>
        <label className='text-muted-foreground text-sm leading-none tracking-tight pointer-events-none'>{name}</label>
        <span
          className={`text-accent-foreground-header text-lg leading-5 tracking-tight font-medium max-w-full truncate`}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default ItemProfileInfo;
