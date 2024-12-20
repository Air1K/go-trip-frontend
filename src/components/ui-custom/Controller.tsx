import { FC, HTMLAttributes } from 'react';

interface ControllerProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  errorMessage: string;
}

const Controller: FC<ControllerProps> = ({ children, label, errorMessage, ...props }) => {
  return (
    <div {...props} className={'relative' + ' ' + props.className}>
      <label>{label}</label>
      <div className={'my-1'}>{children}</div>
      <label className={'absolute -bottom-[18px] left-0 text-xs text-red-500'}>{errorMessage}</label>
    </div>
  );
};

export default Controller;
