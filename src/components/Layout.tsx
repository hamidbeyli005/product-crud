import { ReactNode } from "react"
import Navbar from "./Navbar"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="mt-32 md:mt-16">
                {children}
            </main>
        </div>
    )
}

export default Layout
