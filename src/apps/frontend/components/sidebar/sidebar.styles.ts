const styles = {
  sidebar: {
    container:
      'absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0',

    visible: 'translate-x-0',

    hidden: '-translate-x-full',

    header: 'flex items-center justify-end gap-2 px-6 py-5.5 lg:py-6.5',

    toggleButton: 'block lg:hidden',

    scrollArea: 'flex flex-col overflow-y-auto duration-300 ease-linear',

    navWrapper: 'p-2 lg:px-6',

    sectionHeading: 'mb-2 ml-4 mt-4 text-sm font-semibold text-bodydark2',

    menuList: 'mb-6 flex flex-col gap-1.5',

    menuItem: {
      link: 'group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4',
      linkActive: 'bg-graydark dark:bg-meta-4',
      chevronIcon: 'absolute right-4',

      subMenuWrapper: 'max-h-40 overflow-hidden duration-300 ease-in-out',
      subMenuList: 'mb-5.5 mt-4 flex flex-col gap-2.5 pl-6',
      subMenuItem:
        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white',
      subMenuItemActive: '!text-white',
    },
  },
};

export default styles;
