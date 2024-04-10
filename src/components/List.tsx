import './list.css';
import Button from 'react-bootstrap/Button';
import { motion, AnimatePresence } from "framer-motion"
import ListItem from "./ListItem";
import TodoCreate from './TodoCreate';
import Skeleton from './Skeleton';
import { ListContext } from "../context/provider";
import type { ListProps } from '../context/provider';
import { useContext, useState, useEffect } from 'react';
import { GoPlus, GoGoal, GoPlusCircle } from "react-icons/go";
import { PiCoffee } from "react-icons/pi";
import useSort from '../hooks/use-sort';

function List() {
    const { list, isLoading } = useContext(ListContext);
    const { sortedData } = useSort(list,'dsc');

    const [showCreate, setShowCreate] = useState(false);
    const [yetList, setYetList] = useState<ListProps[]>([]);
    const [completeList, setCompleteList] = useState<ListProps[]>([]);

    useEffect(() => {
        const yet = sortedData.filter(item => item.progress === 'yet');
        const complete = sortedData.filter(item => item.progress === 'complete');
        setYetList(yet);
        setCompleteList(complete);
    }, [sortedData]);
    
    const handleClick = () => {
        setShowCreate(!showCreate);
    }

    const handleClose = () => {
        setShowCreate(false)
    }

    let content
    if (showCreate) {
        content = <TodoCreate onSubmit={handleClose} />
    }

    let yetListHtml;
    if (yetList.length) {
        yetListHtml =yetList.map((item) => (
            <motion.div key={item.id} 
                animate={{ transition: { damping: 800 }, y: 0, opacity:1 }}
                exit={{ opacity: 0, transition: { damping: 800 }, y: "-50%" }}
                initial={{ y: "-50%",opacity:0 }}
            >
                <ListItem item={item} />
            </motion.div>
        ))
    } else {
        if (completeList.length) {
            yetListHtml = <div className='empty-text'>呼！這裡沒有任務了<div><PiCoffee size={22} /></div>
            </div>
        } else {
            yetListHtml = <div className='empty-text'>按<GoPlusCircle className='mx-2 mb-1' size={20} />新增任務</div>
        }
    }

    let completeListHtml;
    if (completeList.length) {
        completeListHtml = completeList.map((item)=>{
            return (
            <motion.div key={item.id} 
                animate={{ transition: { damping: 800 }, y: 0, opacity:1 }}
                exit={{ opacity: 0, transition: { damping: 800 }, y: "-50%" }}
                initial={{ y: "-50%",opacity:0 }}
            >
                <ListItem item={item} />
            </motion.div>)
        })
    } else {
        completeListHtml = <div className='empty-text'>還沒有完成的項目</div>
    }


    return (
        <div className="row">
            <div className="col-md-6">
                <div className="list-outter">
                    <div className="text-center mb-2 icon-height d-flex align-items-center justify-content-center">
                        <Button className='add-btn' onClick={handleClick}><GoPlus size={20} /></Button>
                    </div>
                    <div className='list-wrapper'>
                        <div>{content}</div>
                        <AnimatePresence initial={false}>
                            {isLoading ? <Skeleton amount={5} /> : yetListHtml }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="list-outter complete-list">
                    <div className="text-center mb-2 icon-height d-flex align-items-center justify-content-center"><GoGoal className='text-primary' size={30} /></div>
                    <div className="list-wrapper">
                        <AnimatePresence initial={false}>
                            {isLoading ? <Skeleton amount={5} /> : completeListHtml }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default List;