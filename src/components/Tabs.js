import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import CheckBox from './CheckBox'
import styled from 'styled-components'

const Div = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f0f8ff;
    flex: 1 1 auto;
`

const Form = styled.form`
    margin: 1em; 
`

const Input = styled.input`
    width: 55%;
    height: 2.5em;
    border: 2px solid grey;
    padding: 4px;

    :focus {
        border-color: teal;
    }
`

const Button = styled.button`
    height: 2.5em;
    background-color: black;
    border-radius: 4px;
    color: white;
`

const UrlDiv = styled.div`
    display: flex;
    width: 70%;
    margin: 2em;
    justify-content: center;
    flex-wrap: wrap;
    align-self: center;
`

const OpenButton = styled.button`
    width: 30%;
    margin: 0 auto;
    height: 50px;
    border-radius: 15px;
    background-color: #50c878;
`

const Tabs = ({urls, openAll, getUrls, addUrl, deleteUrl, uid, show, updateShow}) => {
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
        console.log('checkedurl', arr)
        return [...arr].filter(el => el.checked).map(el => el.value)
    }
    let open = (e) => {
        e.preventDefault()
        openAll(getCheckedURL())
    }

    return (
        <Div>
            <Form onSubmit={handleSubmit}>
                <Input value={url} onChange={handleOnChange} type="text" placeholder="add url"/>
                <Button>Add URL</Button>
                { show ? <Alert style={alertStyle} className="mx-auto" variant='danger' onClose={() => updateShow(false)} dismissible>Invalid url</Alert> : null}
            </Form>
            <OpenButton onClick={open}>Tabinate Em</OpenButton>
            <UrlDiv onSubmit={open}>
                {urls && urls.length > 0 ? urls.map((url, i) => <CheckBox title={url.title} key={url._id} getUrls={getUrls} url={url.url} deleteUrl={deleteUrl} i={i} uid={uid} _id={url._id} isChecked={url.checked}/>) : 'Add url!'}
            </UrlDiv>
        </Div>
    )
}

let alertStyle = {
    width: '60%',
    position: 'absolute',
    bottom: 0,
    left: '20%',
}

let validateURL = url => {
    if (url.substr(0, 4) !== 'http') {
        return 'http://' + url
    }
    return url
}

export default Tabs