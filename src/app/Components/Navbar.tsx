'use client';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosContact } from 'react-icons/io';
import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation'; // For client-side navigation
import { useCart } from '@/context/CartContext';

type Category = {
    name: string;
    slug: string;
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const [showSearchBar, setShowSearchBar] = useState(false); // State for showing search bar on small devices
    const router = useRouter();
    const { cartItems } = useCart(); // Correct usage of cartItems

    const cartCount = Array.isArray(cartItems) ? cartItems.length : 0;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        async function fetchCategories() {
            const data = await client.fetch(`
                *[_type == "category"]{
                    name,
                    "slug": slug.current
                }
            `);
            setCategories(data);
        }
        fetchCategories();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            router.push(`/ProductListing?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(''); // Clear search input
        }
    };

    const handleSearchIconClick = () => {
        setShowSearchBar(!showSearchBar);
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

                {/* Cart and Profile Icons */}
                <div className="flex items-center gap-4">
                    {/* Cart Icon with Count */}
                    <div className="relative">
                        <Link href="/Cart">
                            <IoCartOutline size={25} className="text-[#2A254B]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Profile Icon */}
                    <Link href="/Profile">
                        <IoIosContact size={25} className="text-[#2A254B]" />
                    </Link>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        className="text-2xl focus:outline-none z-30"
                        onClick={toggleMenu}
                    >
                        {!menuOpen ? <IoMenu /> : <IoClose />}
                    </button>
                </div>
            </div>

            <hr />

            {/* Mobile Navigation Links */}
            <header
                className={`fixed top-0 right-0 py-6 h-full w-3/4 bg-white shadow-lg transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:w-auto md:translate-x-0 md:bg-transparent md:shadow-none z-20`}
            >
                {/* Close Button in Mobile Menu */}
                {menuOpen && (
                    <div className="flex justify-end p-4 md:hidden">
                        <button
                            className="text-2xl focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <IoClose />
                        </button>
                    </div>
                )}

                <ul className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4 md:gap-8 text-[#726E8D] text-base p-6 md:p-0">
                    {categories.map((category: { name: string }) => (
                        <li key={category.name}>
                            <Link href={`/ProductListing?category=${category.name}`}>
                                <div className="text-gray-800 hover:text-purple-600 font-medium">
                                    {category.name}
                                </div>
                            </Link>
                        </li>
                    ))}
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

            {/* Mobile Show/Hide Search Button */}
            <div className="sm:hidden flex justify-between items-center py-4">
                <button
                    onClick={handleSearchIconClick}
                    className="text-blue-600 hover:text-blue-700"
                >
                    <CiSearch size={25} />
                </button>
            </div>
        </div>
    );
}
