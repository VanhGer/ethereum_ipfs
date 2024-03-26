import { Link } from 'react-router-dom';
function storedList({items}) {

    const handleFileNameClick = (item) => {
        window.location.href = `http://localhost:8085/ipfs/${item.cid}`;
    };

    return (
        <div className={"StoredList"}>
            <h2>Stored List</>
            {items.map(item => (
                <div className={"listRow"}>
                    <div className={"fileName"} onClick={() => handleFileNameClick(item)}>{item.name}</div>
                </div>
                )
            )}
        </div>
    )

}