import classNames from 'classnames';

type ButtonExtraProps = {
  submit?: boolean;
  variant?: 'primary' | 'warning' | 'danger' | 'success';
};

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & ButtonExtraProps;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type={props.submit ? 'submit' : 'button'}
      className={classNames([
        'relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-1 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        props.variant === 'primary'
          ? `bg-artis-orange hover:bg-artis-orange-400 focus-visible:outline-artis-orange`
          : props.variant === 'warning'
          ? `bg-yellow-500 hover:bg-yellow-400 focus-visible:outline-yellow-500`
          : props.variant === 'danger'
          ? `bg-red-500 hover:bg-red-400 focus-visible:outline-red-500`
          : props.variant === 'success'
          ? `bg-green-500 hover:bg-green-400 focus-visible:outline-green-500`
          : `bg-gray-500 hover:bg-gray-400 focus-visible:outline-gray-500`,
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

type IconButtonProps = {
  Icon: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>;
  buttonProps?: ButtonProps;
  iconProps?: React.ComponentPropsWithoutRef<'svg'>;
  children: string | React.ReactNode;
} & ButtonExtraProps;

export function IconButton({
  children,
  Icon,
  buttonProps,
  iconProps,
  variant,
  submit,
}: IconButtonProps) {
  return (
    <Button submit={submit} variant={variant} {...buttonProps}>
      <Icon {...iconProps} className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      {children}
    </Button>
  );
}
