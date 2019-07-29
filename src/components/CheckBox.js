import React, {useState} from 'react'
import styled from 'styled-components'

const Div = styled.div`
    width: 130px;
    height: 130px;
    border: 1px solid yellow;
    border-radius: 4px;
    background-color: grey;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const A = styled.a`
    margin-top: 6px;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid purple;
    background-color: white;
    border-radius: 50%;
`

const CheckBox = ({url, deleteUrl, i}) => {
    let [checked, updateChecked] = useState(true)
    let handleOnChange = (e) => {
        e.preventDefault()
        updateChecked(!checked)
    }
    return (
        <Div>
            <A>
                <img className="mx-2" src={`http://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}></img>
            </A>
            <span onClick={handleOnChange}><input checked={checked}  className="check" value={url} type="checkbox"/>{url}</span><button className="mx-4" onClick={(e) => deleteUrl(e,i)}>Delete</button>
        </Div>
    )
}

export default CheckBox