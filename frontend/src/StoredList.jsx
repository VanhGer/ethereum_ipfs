import { Link } from 'react-router-dom';
import './StoredList.css'
function StoredList({items}) {

    const handleFileNameClick = (item) => {
        window.location.href = `http://localhost:8085/ipfs/${item.cid}`;
    };

    return (
        <div className={"storedList"}>
            <h2>Stored List</h2>
            {items.map(item => (
                <div className={"listRow"}>
                    <a className={"fileName"} onClick={() => handleFileNameClick(item)}>{item.name}</a>
                </div>
                )
            )}
        </div>
    )

}

export default StoredList;