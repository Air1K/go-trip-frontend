import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { ITravelVoucher } from '@/api/travel_voucher/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { Edit } from 'lucide-react';

export const travelVoucherColumns = (setEditVoucherIndex: (index: number) => void): ColumnDef<ITravelVoucher>[] => [
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
    header: 'Дата выдачи',
    // Переводим строку даты в нужный формат, например dd.MM.yyyy
    accessorFn: (row) => (row.issued_at ? format(new Date(row.issued_at), 'dd.MM.yyyy') : ''),
  },
  {
    header: 'Дата вылета',
    accessorFn: (row) => (row.departure_date ? format(new Date(row.departure_date), 'dd.MM.yyyy') : ''),
  },
  {
    header: 'Дата прилёта',
    accessorFn: (row) => (row.arrival_date ? format(new Date(row.arrival_date), 'dd.MM.yyyy') : ''),
  },
  {
    header: 'Стоимость',
    accessorFn: (row) => (row.price ?? '') + ' ' + (row.unitOfMeasurement?.short_name ?? ''),
  },
  {
    header: 'Турист',
    accessorFn: (row) => (row.tourist ? `${row.tourist.firstName ?? ''} ${row.tourist.lastName ?? ''}`.trim() : '-'),
  },
  {
    header: 'Отель',
    accessorFn: (row) => row.hotel?.name ?? '',
  },
  {
    header: 'Турагентство',
    accessorFn: (row) => row.travelAgency?.name ?? '',
  },
  {
    header: 'Единица изм.',
    accessorFn: (row) => row.unitOfMeasurement?.name ?? '',
  },
  {
    id: 'edit',
    cell: ({ row }) => (
      <div className={'w-full flex'}>
        <Button className={'ml-auto'} variant={'outline'} size={'sm'} onClick={() => setEditVoucherIndex(row.index)}>
          <Edit />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
