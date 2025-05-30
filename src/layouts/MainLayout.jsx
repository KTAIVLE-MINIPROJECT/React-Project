import MainHeader from "../components/MainHeader"
import './layout.css'

const MainLayout = ({ children }) => {
    return (
    <main className="main">
        <MainHeader />
        {children}
    </main>
    )
}

export default MainLayout
