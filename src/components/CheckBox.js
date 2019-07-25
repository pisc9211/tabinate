import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'

const CheckBox = ({url, deleteUrl, i}) => {
    let [checked, updateChecked] = useState(true)
    let handleOnChange = (e) => {
        e.preventDefault()
        updateChecked(!checked)
    }
    return (
        <div><span onClick={handleOnChange}><input checked={checked}  className="check" value={url} type="checkbox"/><img className="mx-2" src={`http://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}></img>{url}</span><button className="mx-4" onClick={(e) => deleteUrl(e,i)}>Delete</button></div>
    )
}

export default CheckBox