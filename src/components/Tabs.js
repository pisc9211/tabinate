import React, {useState} from 'react'
import CheckBox from './CheckBox'

const Tabs = ({urls, openAll, addUrl, deleteUrl}) => {
    let [url, updateUrl] = useState('')

    let handleOnChange = (e) => {
        e.preventDefault()
        updateUrl(e.target.value)
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        addUrl(validateURL(url))
        updateUrl('')
    }
    let getCheckedURL = () => {
        let arr = document.getElementsByClassName('check')
        return [...arr].filter(el => el.checked).map(el => el.value)
    }
    let open = (e) => {
        e.preventDefault()
        openAll(getCheckedURL())
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={url} onChange={handleOnChange} type="text" placeholder="add url"/>
                <button>Add URL</button>
            </form>
            <form onSubmit={open}>
                {urls.map((url, i) => <CheckBox url={url} deleteUrl={deleteUrl} i={i} />)}
                <button>Open</button>
            </form>
        </div>
    )
}

let validateURL = url => {
    if (url.substr(0, 4) !== 'http') {
        return 'http://' + url
    }
    return url
}

export default Tabs