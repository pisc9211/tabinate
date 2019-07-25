import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'

import NavBar from './components/NavBar'
import Tabs from './components/Tabs'

function App() {
  let [urls, updateUrls] = useState(['https://www.google.com', 'https://www.youtube.com']);

  let addUrl = (url) => {
    updateUrls([...urls, url])
  }

  let openAll = (urlArr) => {
    urlArr.forEach(url => {
      window.open(url, '_blank');
    })
  }

  let deleteUrl = (e, i) => {
    e.preventDefault()
    updateUrls([...urls.slice(0, i), ...urls.slice(i+1)])
  }

  return (
    <Container>
      <NavBar/>
      <Tabs urls={urls} openAll={openAll} addUrl={addUrl} deleteUrl={deleteUrl}/>
    </Container>
  );
}

export default App;
