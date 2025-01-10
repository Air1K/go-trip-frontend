import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ITourOperator } from '@/api/tour-operator/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { Edit } from 'lucide-react';

export const tourOperatorColumns = (onEdit: (index: number) => void): ColumnDef<ITourOperator>[] => [
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
    accessorKey: 'short_name',
    header: 'Краткое название',
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
