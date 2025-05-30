import { Link } from 'react-router-dom'
import notFoundImage from '/404.gif'
import './index.css'

const NotFound = () => {
    return (
        <main className='not-found'>
            <h1>Not Found</h1>
            <img src={notFoundImage} alt='not found' height={300} />
            <h5>이런! 페이지를 찾을 수 없습니다!</h5>
            <Link to={'/'}>돌아가기</Link>
        </main>
    )
}

export default NotFound
