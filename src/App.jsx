import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'

import searchImage from '/search.png'
import bookImage from '/book.png'
import { Button } from '@mui/material'

import axios from 'axios'
import { domain } from './const/http';

function App() {
  const navigate = useNavigate()

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
    </div>
  )
}

export default App
