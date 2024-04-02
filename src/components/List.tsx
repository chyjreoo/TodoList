import './list.css';
import Button from 'react-bootstrap/Button';
import ListItem from "./ListItem";
import { ListContext } from "../context/provider";
import { useContext } from 'react';

function List() {
    const { list } = useContext(ListContext);
    
    return (
        <div className="list-box">
            <h1>TODOLIST</h1>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <p className='mb-0'>今日清單</p>
                <Button variant="primary">+ 新增任務</Button>
            </div>
            {
                list.map((item)=>{
                    return(
                        <ListItem key={item.id} item={item} />
                    )
                })
            }
        </div>
    )
}

export default List;