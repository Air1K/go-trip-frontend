import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { IHotel } from '@/api/hotel/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { Edit } from 'lucide-react';

export const hotelColumns = (onEdit: (index: number) => void): ColumnDef<IHotel>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Наименование',
  },
  {
    header: 'Класс отеля',
    accessorFn: (row) => row.serviceClasses.name,
  },
  {
    header: 'Населенный пункт',
    accessorFn: (row) => row.settlements.name,
  },
  {
    id: 'edit',
    cell: ({ row }) => (
      <div className={'w-full flex'}>
        <Button className={'ml-auto'} variant={'outline'} size={'sm'} onClick={() => onEdit(row.index)}>
          <Edit />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
