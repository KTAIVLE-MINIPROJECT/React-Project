import MainHeader from "../components/MainHeader"

const MainLayout = ({ children }) => {
    return <main className="main">
        <MainHeader />
        {children}
    </main>
}

export default MainLayout
