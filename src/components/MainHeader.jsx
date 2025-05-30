import { Link } from "react-router-dom"

const MainHeader = () => {
    return <header className="main-header">
        <Link to={'/'}>도서관리시스템</Link>
    </header>
}

export default MainHeader
