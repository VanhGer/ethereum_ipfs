import './Form.css';
import {useState} from "react";
function Form() {
    const [fileName, setName] = useState("");
    const [file, setFile] = useState(null);
    function nameHandleChangeFn(evt) {
        setName(evt.target.value);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setName(selectedFile.name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Tên file:', fileName);
        console.log('File:', file);
    };

    return (
        <div>
            <h2>Upload your file here</h2>
            <form onSubmit={handleSubmit}>
                <div className={"fileForm"}>
                    <label htmlFor="fileInput">Choose file:</label>
                    <input
                        type="file"
                        id="fileInput"

                        onChange={handleFileChange}
                    />
                </div>

                <div className={"nameForm"}>
                    <label htmlFor="fileName">Enter your file name:</label>
                    <input
                        type="text"
                        id="fileName"
                        value={fileName}
                        onChange={nameHandleChangeFn}
                    />
                </div>
                <button className="submitBtn" type={"submit"}>Submit</button>
            </form>
            {fileName}
            {/*{file}*/}
        </div>
    );
}

export default Form
