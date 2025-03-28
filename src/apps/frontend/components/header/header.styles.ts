const styles = {
  header: {
    wrapper:
      'sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none',
    content:
      'flex grow items-center justify-between p-4 shadow-md md:px-6 2xl:px-11',
    sidebarWrapper: 'flex items-center gap-4 lg:hidden',
    userProfileWrapper: 'flex flex-1 items-center justify-end gap-3 2xsm:gap-7',

    hamburgerButton: {
      wrapper:
        'block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden',
      iconContainer: 'relative block size-5.5 cursor-pointer',
      threeLineWrapper: 'absolute right-0 block size-full',
      crossLineWrapper: 'absolute right-0 size-full rotate-45',
      lineCommon:
        'relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white',
      crossLineVertical:
        'absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black duration-200 ease-in-out dark:bg-white',
      crossLineHorizontal:
        'absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white',
    },

    userMenuDropdown: {
      wrapper:
        'absolute right-0 mt-4 flex w-56 flex-col gap-5 rounded-sm border border-stroke bg-white px-6 py-5 shadow-default dark:border-strokedark dark:bg-boxdark',
      visible: 'block',
      hidden: 'hidden',
      item: 'flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base',
      icon: 'fill-current opacity-50 sm:block',
    },

    userProfileSnippet: {
      wrapper: 'relative',
      trigger: 'flex items-center gap-4',
      nameBlock: 'hidden text-right lg:block',
      nameText: 'block text-sm font-medium text-black dark:text-white',
      roleText: 'block text-xs',
      avatar: 'size-12 rounded-full',
      dropdownIcon: 'hidden fill-current opacity-50 sm:block',
    },
  },
};

export default styles;
