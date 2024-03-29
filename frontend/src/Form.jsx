import './Form.css';
import {useState} from "react";
import axios from 'axios';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file === null) {
            alert("File cannot be empty!");
            return;
        }
        if (fileName === "") {
            alert("Filename cannot be empty!");
        }
        const formData = new FormData;
        formData.append('file', file);
        formData.append('name', fileName);
        try {
            const response = await axios.post('http://localhost:4000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Uploaded Successfully:', response.data);
            alert("File uploaded successfully!")
        } catch (error) {
            console.error('Error:', error);
            alert("File uploaded unsuccessfully");
        }
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
