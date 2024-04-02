import { useEffect, useContext } from "react";
import { ListContext } from "./context/provider";
import List from "./components/List";

function App() {
    const { fetchList } = useContext(ListContext);
    
    useEffect(() => {
        fetchList();
    }, [fetchList]);

    return (
        <div>
            <List />
        </div>
    )
}

export default App
