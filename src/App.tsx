import { useEffect, useContext } from "react";
import { ListContext } from "./context/provider";
import List from "./components/List";
import Header from "./components/Header";

function App() {
    const { fetchList } = useContext(ListContext);
    
    useEffect(() => {
        fetchList();
    }, [fetchList]);

    return (
        <div className="page-content">
            <div className="container">
                <div className="list-box">
                    <Header />
                    <List />
                </div>
            </div>
        </div>
    )
}

export default App
