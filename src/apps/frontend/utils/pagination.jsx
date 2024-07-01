// impolement calculatePageCount
export const calculatePageCount = (totalItems, itemsPerPage) => {
    return Math.ceil(totalItems / itemsPerPage);
}