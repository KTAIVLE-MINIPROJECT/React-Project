import { Link } from 'react-router-dom'
import viteLogo from '/vite.svg'

const NotFound = () => {
    return (
        <main className='not-fount'>
            <h1>Not Found</h1>
            <img src={viteLogo} alt='not found' width={300} height={300} />
            <h5>이런! 페이지를 찾을 수 없습니다!</h5>
            <Link to={'/'}>돌아가기</Link>
        </main>
    )
}

export default NotFound
