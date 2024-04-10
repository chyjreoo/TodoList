import type { ListProps } from "../context/provider";

function useSort(data:ListProps[], order:string) {
    let sortedData = data;
    const sortOrder: string = order;
    const reverseOrder = sortOrder === 'asc'? 1 : -1;
    sortedData = sortedData.sort( (a: ListProps,b: ListProps)=>{
        const valueA = a.time;
        const valueB = b.time;
        return valueA.localeCompare(valueB) * reverseOrder;
        
    } )
    return ({sortedData,})
}

export default useSort;