import './listItem.css';
import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ListContext } from '../context/provider';
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { GoAlert } from "react-icons/go";

function TodoCreate({ onSubmit }: { onSubmit: () => void }) {

    const { createTodo } = useContext(ListContext);
    const [todoText, setTodoText] = useState('');
    const [alertText, setAlertText] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (todoText) {
            createTodo(todoText)
            onSubmit();
            setAlertText('')

        } else {
            setAlertText('請輸入待辦事項')
        }
    }

    const handleClose = () => {
        onSubmit();
    }
    return (
        <Form onSubmit={handleSubmit} className='list-item'>
            <div className='d-flex w-100 my-4 flex-wrap'>
                <Form.Control autoFocus onChange={(e)=>setTodoText(e.target.value)} value={todoText} className='border-0 border-bottom rounded-0' type="text" placeholder="輸入待辦事項" />
                <Button type='submit'><IoCheckmark /></Button>
                <Button type='button' onClick={handleClose}><IoCloseOutline size={17} /></Button>

                {alertText? <p className='alert-text'><GoAlert className='me-1' />請輸入待辦事項</p> : ""}
            </div>
        </Form>

    )



}

export default TodoCreate;