import { NavLink } from "react-router-dom";

const links = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Products" },
    { to: "/categories", text: "Categories" }
];

const Navbar = () => {
    return (
        <nav className="bg-gray-800 w-full fixed top-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hidden md:block">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {links.map((link, index) => (
                                <NavLink key={index} to={link.to} className={({ isActive }) =>
                                    isActive ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}>
                                    {link.text}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {links.map((link, index) => (
                        <NavLink key={index} to={link.to} className={({ isActive }) =>
                            isActive ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" :
                                "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}>
                            {link.text}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
