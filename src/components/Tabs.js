import React, {useState} from 'react'
import CheckBox from './CheckBox'
import styled from 'styled-components'

const Div = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid blue;
`

const Form = styled.form`
    margin: 1em;
`

const Input = styled.input`
    width: 55%;
    height: 2em;
    border: 2px solid grey;
    padding: 4px;

    :focus {
        border-color: teal;
    }
`

const Button = styled.button`
    height: 2em;
    background-color: black;
    border-radius: 4px;
    color: white;
`

const UrlDiv = styled.div`
    display: flex;
    width: 70%;
    margin: 2em;
    justify-content: center;
`

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
        <Div>
            <Form onSubmit={handleSubmit}>
                <Input value={url} onChange={handleOnChange} type="text" placeholder="add url"/>
                <Button>Add URL</Button>
            </Form>
            <UrlDiv onSubmit={open}>
                {urls.map((url, i) => <CheckBox url={url} deleteUrl={deleteUrl} i={i} />)}
            </UrlDiv>
            <button>Open</button>
        </Div>
    )
}

let validateURL = url => {
    if (url.substr(0, 4) !== 'http') {
        return 'http://' + url
    }
    return url
}

export default Tabs