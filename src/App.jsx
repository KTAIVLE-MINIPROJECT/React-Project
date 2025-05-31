import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'

import searchImage from '/search.png'
import bookImage from '/book.png'
import { Button } from '@mui/material'

import axios from 'axios'
import { domain } from './const/http';
import CoverGeneratePopup from './components/CoverGeneratePopup';

function App() {
  const navigate = useNavigate()
  const [openPopup, setOpenPopup] = useState(false)

  const hello = async () => {
    const res = await axios(domain + '/api/v1/hello')

    if (res.status == 200) {
      console.log('hello check')
    } else {
      console.error('hello fail.. check your server.')
    }
  }

  useEffect(() => {
    hello()
  }, [])

  const handleRouteBook = () => navigate('/book')
  const handleRouteBookRegister = () => navigate('/book/register')
  const handleOpenPopup = () => {
    setOpenPopup(true)
  }
  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  return (
    <div className='home'>
      <Button className='route-button' variant="contained" onClick={handleRouteBook}>
        <img src={searchImage} />
        <h3>도서 조회</h3>
      </Button>
      <Button className='route-button' variant="contained" onClick={handleRouteBookRegister}>
        <img src={bookImage} />
        <h3>도서 등록</h3>
      </Button>
      <Button className='route-button' variant="contained" onClick={handleOpenPopup}>
        <img src={bookImage} />
        <h3>팝업 임시</h3>
      </Button>
      {openPopup ? <CoverGeneratePopup onClose={handleClosePopup} /> : null}
    </div>
  )
}

export default App
