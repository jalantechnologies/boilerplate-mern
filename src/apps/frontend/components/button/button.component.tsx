import { VariantProps, cva } from 'class-variance-authority';
import React, { ComponentProps, PropsWithChildren } from 'react';

export const buttonStyles = cva(['transition-colors'], {
  variants: {
    kind: {
      primary: ['bg-primary', 'hover:bg-opacity-90', 'flex', 'gap-2', 'font-medium', 'text-white', 'items-center', 'justify-center'],
      secondary: ['hover:bg-gray-2', 'text-sm', 'flex', 'gap-2', 'justify-start', 'items-center', 'text-left', 'text-black'],
      tertiary: ['hover:bg-gray-2'],
    },
    size: {
      mini: ['p-1.5'],
      compact: ['p-2'],
      default: ['p-2.5'],
      large: ['p-3.5'],
    },
    shape: {
      default: ['rounded', 'w-full'],
      square: ['rounded', 'w-full', 'w-10', 'h-10'],
      circle: [
        'rounded-full',
        'items-center',
        'justify-center',
        'flex',
        'flex-col',
        'w-10',
        'h-10',
      ],
      pill: ['bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-full'],
    },
  },
  defaultVariants: {
    kind: 'primary',
    shape: 'default',
    size: 'default',
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<'button'>;

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children, kind, shape, size, className, ...props
}) => (
    <button
      {...props}
      className={buttonStyles({ kind, shape, size })}
    >
      {children}
    </button>
);
export default Button;
