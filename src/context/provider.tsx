import { createContext, useCallback, useState, ReactNode } from 'react';
import axios from 'axios';

export interface ListProps {
    id: string;
    title: string;
    time: string;
}
interface GlobalValProps {
    list: ListProps[];
    fetchList: () => Promise<void>;
}

export const ListContext = createContext<GlobalValProps>({
    list: [],
    fetchList: async () => {}
});


export function Provider({ children }: {children: ReactNode}) {
    const [list, setList] = useState<ListProps[]>([]);
    const fetchList = useCallback( async () => {
        try {
            const response = await axios.get('http://localhost:3005/list');
            setList(response.data);
        } catch (error) {
            console.error('Error fetching list:', error);
        }
    }, []);
    
    const globalValue: GlobalValProps = {
        list,
        fetchList
    };
  
    return (
        <ListContext.Provider value={globalValue}>
            {children}
        </ListContext.Provider>
    )
}
