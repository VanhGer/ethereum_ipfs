import { Link } from 'react-router-dom';
function StoredList({items}) {

    const handleFileNameClick = (item) => {
        window.location.href = `http://localhost:8085/ipfs/${item.cid}`;
    };

    return (
        <div className={"storedList"}>
            <h2>Stored List</h2>
            {items.map(item => (
                <div className={"listRow"}>
                    <div className={"fileName"} onClick={() => handleFileNameClick(item)}>{item.name}</div>
                </div>
                )
            )}
        </div>
    )

}

export default StoredList;