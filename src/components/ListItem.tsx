import './listItem.css';
import Form from 'react-bootstrap/Form';
import { ListProps } from '../context/provider';

function ListItem({ item }: {item:ListProps}) {
    
    return (
        <div key={item.id} className='list-item'>
            <Form.Check className='flex-grow-1' type="checkbox" id={item.id}>
                <Form.Check.Label className='w-100'>
                    <Form.Check.Input type="checkbox" />
                    {item.title}
                </Form.Check.Label>
            </Form.Check>

            <div className='ms-auto btn btn-light'>edit</div>
        </div>
    )



}

export default ListItem;