const styles = {
  input: {
    container:
      'w-full rounded-lg border bg-white py-4 px-4 outline-none focus:border-primary focus-visible:shadow-none',

    field:
      'flex-1 w-full outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none',

    border: {
      error: 'border-red-500',
      normal: 'border-stroke',
    },

    textAlign: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },

    disabled: 'cursor-not-allowed text-slate-500',

    enhancerWrapper: 'flex h-full min-w-6 items-center justify-center',

    passwordInput: {
      visibilityIcon: 'size-6.5 opacity-65',
    },

    textArea: {
      base: 'w-full rounded-sm border bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none',
      errorBorder: 'border-red-500',
      normalBorder: 'border-stroke',
    },
  },
};

export default styles;
