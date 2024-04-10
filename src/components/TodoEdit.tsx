import './listItem.css';
import { useContext, useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ListContext, ListProps } from '../context/provider';
import { AiOutlineSave } from "react-icons/ai";

function TodoEdit({ item, handleEditShow, showEdit }: { item: ListProps; handleEditShow: () => void; showEdit: boolean; }) {
    
    const { editTodo } = useContext(ListContext);
    const [editedTitle, setEditedTitle] = useState(item.title);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showEdit && inputRef.current) {
            inputRef.current.focus(); 
        }
    }, [showEdit]);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        handleEditShow();
        editTodo(item.id, editedTitle, item.progress);
    }

   
 
    return (
        <Form onSubmit={handleSubmit} className='d-flex align-items-center w-100'>
            <Form.Control ref={inputRef} onChange={(e)=>setEditedTitle(e.target.value)} value={editedTitle} className='flex-grow-1 my-4 border-0 border-bottom rounded-0' type="text" placeholder="輸入待辦事項" />
            <Button type='submit' className='border-0 px-2'><AiOutlineSave /></Button>
        </Form>

    )



}

export default TodoEdit;