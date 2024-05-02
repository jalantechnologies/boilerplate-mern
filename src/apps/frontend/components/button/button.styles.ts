const styles = {
  kind: {
    primary: {
      base: `
        active:bg-primary/80
        bg-primary
        border
        flex
        font-medium
        gap-2
        items-center
        justify-center
        px-4
        rounded-md
        text-white
        transition
        w-full
      `,
      disableState: 'cursor-not-allowed bg-primary/80',
      enableState: 'hover:bg-primary/90 cursor-pointer',
    },
    secondary: {
      base: `
        flex
        gap-2 
        items-center
        justify-start
        rounded
        text-black
        text-left
        text-sm
        w-full
      `,
      disableState: 'cursor-not-allowed',
      enableState: 'cursor-pointer',
    },
    tertiary: {
      base: `
        active:bg-transparent
        bg-transparent
        text-center
        text-lg
        text-primary
      `,
      disableState: 'cursor-not-allowed text-slate-500',
      enableState: 'cursor-pointer',
    },
  },
  size: {
    compact: 'p-2',
    default: 'p-2.5',
    large: 'p-3.5',
    mini: 'p-1.5',
  },
};

export default styles;
