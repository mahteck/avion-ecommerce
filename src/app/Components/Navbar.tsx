'use client';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCartOutline, IoLogIn } from 'react-icons/io5';
import { IoIosContact, IoIosHome, IoIosLogIn } from 'react-icons/io';
import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation'; // For client-side navigation
import { useCart } from '@/context/CartContext';
import { SiIconfinder } from 'react-icons/si';
import { FaSign, FaTruck } from 'react-icons/fa';

type Category = {
    name: string;
    slug: string;
};

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { cartItems } = useCart();

    const cartCount = Array.isArray(cartItems) ? cartItems.length : 0;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await client.fetch(`
                    *[_type == "category"]{
                        name,
                        "slug": slug.current
                    }
                `);
                setCategories(data);
            } catch (err: any) {
                setError('Failed to load categories. Please check your network connection.');
                console.error("Error fetching categories:", err);
            }
        }
        fetchCategories();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            router.push(`/ProductListing?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setShowSearchBar(false); // Close search bar on submit
        }
    };

    const handleSearchIconClick = () => {
        setShowSearchBar(!showSearchBar);
    };

    const handleMenuItemClick = () => {
        setMenuOpen(false); // Close menu on link click
    };

    return (
        <div className="p-4 w-full h-auto">
            {/* Top Section */}
            <div className="flex justify-between items-center py-2 relative">
                {/* Search Form for Larger Screens */}
                <div className="hidden sm:flex items-center w-full max-w-md">
                    <form onSubmit={handleSearch} className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search products or categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                        >
                            <CiSearch size={20} />
                        </button>
                    </form>
                </div>

                {/* Logo */}
                <Link href="/">
                    <h1 className="text-[#22202E] text-xl md:text-2xl md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-6">
                        Avion
                    </h1>
                </Link>

                {/* Icons Section */}
                <div className="flex items-center gap-4">
                    {/* Search Icon for Mobile and Tablet */}
                    <button
                        onClick={handleSearchIconClick}
                        className="sm:hidden text-[#2A254B] hover:text-purple-600"
                    >
                        <CiSearch size={25} />
                    </button>

                    <Link href="/">
                        <IoIosHome size={28} className="text-[#2A254B] hover:text-purple-600 transition" />
                    </Link>

                    <Link href="/Login">
                        <IoLogIn size={28} className="text-[#2A254B] hover:text-purple-600" />
                    </Link>

                    <div className="relative">
                        <Link href="/Cart">
                            <IoCartOutline size={28} className="text-[#2A254B] hover:text-purple-600 transition" />
                        </Link>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs shadow-md">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    {/* <Link href="/ProfileEdit">
                        <IoIosContact size={25} className="text-[#2A254B]" />
                    </Link> */}
                    <Link href="/order-tracking" className="flex items-center">
                        <FaTruck size={25} className="text-[#2A254B] hover:text-purple-600" />
                    </Link>

                   
                </div>

                {/* Hamburger Menu for Mobile */}
                <button
                    className="md:hidden text-2xl focus:outline-none z-30"
                    onClick={toggleMenu}
                >
                    {menuOpen ? <IoClose /> : <IoMenu />}
                </button>
            </div>

            <hr />

            {error && (
                <div className="bg-red-500 text-white p-2 text-center">
                    {error}
                </div>
            )}

            {/* Mobile Navigation Links */}
            <header
                className={`fixed top-0 right-0 py-6 h-full w-3/4 bg-white shadow-lg transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:static md:w-auto md:translate-x-0 md:bg-transparent md:shadow-none z-20`}
            >
                <ul className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4 md:gap-8 text-[#726E8D] text-base p-6 md:p-0">
                    {categories.length > 0 ? (
                        categories.map((category: { name: string }) => (
                            <li key={category.name}>
                                <Link href={`/ProductListing?category=${category.name}`} onClick={handleMenuItemClick}>
                                    <div className="text-gray-800 hover:text-purple-600 font-medium">
                                        {category.name}
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Loading categories...</p>
                    )}
                </ul>
            </header>

            {/* Mobile Search Bar */}
            {showSearchBar && (
                <div className="sm:hidden w-full">
                    <form onSubmit={handleSearch} className="flex w-full bg-white p-4 fixed top-0 left-0 z-50 shadow-lg">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                        >
                            <CiSearch size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
