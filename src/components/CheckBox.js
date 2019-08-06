import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Div = styled.div`
    width: 150px;
    height: 150px;
    border: 1px solid yellow;
    border-radius: 4px;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    flex-wrap: wrap;
`

const Close = styled.label`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
`

const Delete = styled.label`
    position: absolute;
    width: 20px;
    height; 20px;
    top: 0;
    right: 0;
    color: #fff;
    :hover {
        cursor: pointer;
    }
`

const A = styled.a`
    margin-top: 6px;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid purple;
    background-color: white;
    border-radius: 50%;
`

const Name = styled.div`
    width: 90%;
    background-color: white;
    border-radius: 20px;
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    max-height: 24px;
`

const CheckBox = ({title, url, _id, getUrls, deleteUrl, i, uid, isChecked}) => {

    let handleOnChange = (e) => {
        updateCheckMark(_id, e.target.checked)
    }

    let updateCheckMark = (id, checked) => {
        console.log(id, checked, uid)
        axios.post('/api/check', {
            uid: uid,
            urlId: id,
            checked: checked
        }).then(() => getUrls())
    }

    let handleDelete = () => {
        deleteUrl(_id)
    }

    let imgUrl = `http://s2.googleusercontent.com/s2/favicons?domain_url=${url}`

    return (
        <Div className='mx-2 my-2'>
            <Close>
                <input value={url} onChange={handleOnChange} checked={isChecked} className="check" type="checkbox"/>
                <span className="checkmark"></span>
            </Close>
            <Delete onClick={handleDelete}>x</Delete>
            <A>
                <img alt="favicon" className="mx-2" src={imgUrl}></img>
            </A>
            <Name>
                    {/* {url ? getDomain(url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/img).toString()): null} */}
                    {title}
            </Name>
            
        </Div>
    )
}

let getDomain = url => {
    if (url.indexOf('http://') === 0) {
        url = url.substr(7)
    } else if (url.indexOf('https://') === 0) {
        url = url.substr(8)
    }

    if (url.indexOf('www.') > -1) {
        return url.substr(url.indexOf('www.') + 4)
    }
    return url;
}

export default CheckBox