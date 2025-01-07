import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ISettlement } from '@/api/settlement/types.ts';

export const settlementColumns = (): ColumnDef<ISettlement>[] => [
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
    header: 'Страна',
    accessorFn: (row) => row.country.name,
  },
  {
    accessorKey: 'name',
    header: 'Наименование',
  },
  {
    header: 'Тип населенного пункта',
    accessorFn: (row) => row.settlementType.name,
  },
];
