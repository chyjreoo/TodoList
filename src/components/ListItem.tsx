import './listItem.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState, useRef, useEffect } from 'react';
import { ListProps, ListContext } from '../context/provider';
import TodoEdit from './TodoEdit';
import { GoTrash, GoPencil } from "react-icons/go";

function ListItem({ item }: {item:ListProps;} ) {

    const { deleteTodo, editTodo } = useContext(ListContext)
    const [showEdit, setShowEdit] = useState(false);
    const [progress, setProgress] = useState('yet');
    const [isChecked, setIsChecked] = useState(item.progress === 'complete'); // Set initial checked status

    const listItemRef = useRef<HTMLDivElement>(null);


    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if (listItemRef.current && !listItemRef.current.contains(event.target as Node)) {
                setShowEdit(false);
                // setFocusedItemId(null);
            }
        }
        // Add event listener when component mounts
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            // Remove event listener when component unmounts
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[])

       
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const newProgress = isChecked ? 'complete' : 'yet';
        setProgress(newProgress); // Update progress state
        editTodo(item.id, item.title, newProgress); // Pass the new progress directly

        setIsChecked(isChecked);
    }
    
    const handleDelete = (id: string)=>{
        deleteTodo(id)
    }
    const handleEditShow = ()=>{
        setShowEdit(!showEdit);
    }

    let content;

    
    if (!showEdit) {
        content = <>
            <Form.Check className='ps-0 me-3 mb-0' type="checkbox" id={item.id}>
                <Form.Check.Label>
                    <Form.Check.Input onChange={handleCheckboxChange} type="checkbox" checked={isChecked} />
                    <span className='default'></span>
                </Form.Check.Label>
            </Form.Check>
           
            <div onClick={handleEditShow} className='input-change-trigger flex-grow-1 py-4'>
                {item.title}
            </div>
            <Button className='edit-btn' onClick={handleEditShow}><GoPencil /></Button>
            <Button className='del-btn' onClick={()=>handleDelete(item.id)}><GoTrash /></Button>
        </>
    } else {
        content = <TodoEdit item={item} handleEditShow={handleEditShow} showEdit={showEdit} />
    }
    
    return (
        <div key={item.id} ref={listItemRef} className='list-item rounded'>
            {content}
        </div>
      
    )



}

export default ListItem;