// components/Navbar.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <button
                        className="text-white block md:hidden"
                        onClick={toggleMenu}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <ul
                        className={`${isOpen ? "translate-y-0" : "-translate-y-full"
                            } md:translate-y-0 fixed inset-0 z-10 flex flex-col justify-center items-center space-y-4 md:space-y-0 md:space-x-4 md:flex-row w-full h-full md:static md:w-auto md:bg-transparent md:p-0 bg-blue-500 transition-transform duration-300 ease-in-out transform`}

                    >
                        <li className="text-center">
                            <Link href="/">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={"/images/tai-tools-icon.png"}
                                        alt={"tools logo"}
                                        width={52}
                                        height={52}
                                    />
                                    <span className="text-white font-bold text-2xl cursor-pointer">
                                        Tai Tools
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li className="text-center">
                            <Link href="/tai-time">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={"/images/tai-time-icon.png"}
                                        alt={"clock logo"}
                                        width={52}
                                        height={52}
                                    />
                                    <span className="text-white font-bold text-2xl cursor-pointer">
                                        Tai Time
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li className="text-center">
                            <Link href="/tai-home">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={"/images/tai-home-icon.png"}
                                        alt={"house logo"}
                                        width={52}
                                        height={52}
                                    />
                                    <span className="text-white font-bold text-2xl cursor-pointer">
                                        Tai Home
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <button
                            className="text-white text-5xl absolute top-4 right-4 md:hidden"
                            onClick={toggleMenu}
                        >
                            &times;
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
