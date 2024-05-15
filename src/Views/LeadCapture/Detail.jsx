import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Detail = ({ noteEditorValue, setNoteEditorValue}) => {
return(
    <ReactQuill theme="snow" value={ noteEditorValue} onChange={ setNoteEditorValue}/>
)
}
export default Detail