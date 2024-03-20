import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            <Navbar />
            <main className="mt-32 md:mt-16">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
