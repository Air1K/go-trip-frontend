import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ICountry } from '@/api/country/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { Edit } from 'lucide-react';

export const countryColumns = (): ColumnDef<ICountry>[] => [
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
    accessorKey: 'code',
    header: 'Код страны',
  },
  {
    accessorKey: 'name',
    header: 'Наименование',
  },
  {
    accessorKey: 'abbreviation',
    header: 'Аббревиатура',
  },
  {
    id: 'edit',
    cell: () => (
      <div className={'w-full flex'}>
        <Button className={'ml-auto'} variant={'outline'} size={'sm'}>
          <Edit />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
