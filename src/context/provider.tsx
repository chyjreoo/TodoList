import { createContext, useCallback, useState, ReactNode } from 'react';
// import axios from 'axios';

export interface ListProps {
    id: string;
    title: string;
    time: string;
    progress: string;
}
interface GlobalValProps {
    list: ListProps[];
    fetchList: () => Promise<void>;
    createTodo: (title: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    editTodo: (id: string, title: string, progress: string) => Promise<void>;
    isLoading: boolean;
}

export const ListContext = createContext<GlobalValProps>({
    list: [],
    fetchList: async () => {},
    createTodo: async () => {},
    deleteTodo: async () => {},
    editTodo: async () => {},
    isLoading: true
});

export function Provider({ children }: {children: ReactNode}) {
    const tasks: ListProps[] = [];
    
    const [list, setList] = useState<ListProps[]>(tasks);
    const [isLoading, setIsLoading] = useState(true);

    const fetchList = useCallback( async () => {
        try {
            // const response = await axios.get('http://localhost:3005/list');
            
            setList(tasks);
            // 測試用
            setTimeout(()=>{
                setIsLoading(false);
            },2500)
        } catch (error) {
            console.error('Error fetching list:', error);
            setIsLoading(false);
        } 
    }, []);

    const createTodo = async ( title: string, progress: string = 'yet' ) => {
        try {
            // const response = await axios.post('http://localhost:3005/list',{
            //     title: title,
            //     time: new Date().toISOString(),
            //     progress: progress
            // })
            const id = new Date().toISOString();
            const newTask = {
                id: id,
                title: title,
                time: new Date().toISOString(),
                progress: progress
            }
            // console.log(response.data)
            console.log(...list)
            const updatedList = [...list, newTask];
            setList(updatedList)
        } catch (error) {
            console.log(error)
        }
    }

    const editTodo = async ( id: string, title: string, progress: string ) => {
        try {
            // const response = await axios.put(`http://localhost:3005/list/${id}`,{
            //     title: title,
            //     time: new Date().toISOString(),
            //     progress: progress,
            // });
            const editTask = {
                id: id,
                title: title,
                time: new Date().toISOString(),
                progress: progress
            }

            const updatedList = list.map((item: ListProps)=>{
                if (item.id === id) {
                   return {...item, ...editTask}
                }
                return item;
            })
            setList(updatedList);
        } catch (error) {
            console.log(error)
        }
    
    }
    
    const deleteTodo = async ( id: string ) => {
        try {
            // await axios.delete(`http://localhost:3005/list/${id}`);
            const updatedList = list.filter((item)=>{
                return item.id !== id;
            })
            return setList(updatedList);

        } catch(error) {
            console.log(error)
        }
    }
    
    
    const globalValue: GlobalValProps = {
        list,
        fetchList,
        createTodo,
        deleteTodo,
        editTodo,
        isLoading
    };
  
    return (
        <ListContext.Provider value={globalValue}>
            {children}
        </ListContext.Provider>
    )
}
