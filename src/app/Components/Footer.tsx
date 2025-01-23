'use client';

import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebookSquare, FaTwitter, FaPinterest } from "react-icons/fa";
import { IoLogoSkype } from "react-icons/io";

const Footer = () => {

    return (
        <div className="px-6 md:px-12 py-8 bg-[#2A254B] mt-8">
            <div className="flex flex-wrap justify-between gap-8">
                {/* Menu Section */}
                <div className="text-gray-500">
                    <h1 className="text-lg md:text-xl font-bold">Menu</h1>
                    <div className="space-y-2">
                        <h1><Link href="/">New Arrivals</Link></h1>
                        <h1><Link href="/">Best Sellers</Link></h1>
                        <h1><Link href="/">Recently Viewed</Link></h1>
                        <h1><Link href="/">Popular This Week</Link></h1>
                        <h1><Link href="/ProductListing">All Products</Link></h1>
                    </div>
                </div>

                {/* Categories Section */}
                {/* <div className="text-gray-500">
                    <h1 className="text-lg md:text-xl font-bold">Categories</h1>
                    <div className="space-y-2">
                        <h1><Link href="/">Crockery</Link></h1>
                        <h1><Link href="/">Furniture</Link></h1>
                        <h1><Link href="/">Homeware</Link></h1>
                        <h1><Link href="/">Plant Pots</Link></h1>
                        <h1><Link href="/">Chairs</Link></h1>
                    </div>
                </div> */}

                {/* Company Section */}
                <div className="text-gray-500">
                    <h1 className="text-lg md:text-xl font-bold">Our Company</h1>
                    <div className="space-y-2">
                        <h1><Link href="/About">About Us</Link></h1>
                        <h1><Link href="/Vacancies">Vacancies</Link></h1>
                        <h1><Link href="/Contactus">Contact Us</Link></h1>
                        <h1><Link href="/Privacy">Privacy</Link></h1>
                        <h1><Link href="/ReturnPolicy">Return Policy</Link></h1>
                    </div>
                </div>

                {/* Mailing List Section */}
                <div className="text-white">
                    <h1 className="text-lg md:text-xl font-bold">Join our mailing list</h1>
                    <div className="flex flex-col sm:flex-row mt-4">
                        <input
                            type="text"
                            placeholder="your@email.com"
                            className="w-full sm:w-[250px] lg:w-[300px] h-[48px] p-2 bg-transparent border border-white rounded-md"
                        />
                        <Link href="/Signup">
                            <button className="mt-2 sm:mt-0 sm:ml-2 w-full sm:w-[100px] h-[48px] bg-white text-[#2A254B] rounded-md">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <hr className="bg-[#4E4D93] my-8" />

            {/* Footer Bottom Section */}
            <div className="flex flex-wrap justify-between items-center text-white gap-4">
                <div>
                    <h1>Copyright 2022 Avion LTD</h1>
                </div>
                <div className="flex gap-4">
                    <Link href="https://www.linkedin.com/in/shoaibmunir88/" target='_blank'><FaLinkedin size={20} /></Link>
                    <Link href="https://www.facebook.com/shoaibmunir88" target='_blank'><FaFacebookSquare size={20} /></Link>
                    <Link href="https://www.instagram.com/shoaibmunir88/" target='_blank'><FaInstagram size={20} /></Link>
                    <Link href="/"><IoLogoSkype size={20} /></Link>
                    <Link href="/"><FaTwitter size={20} /></Link>
                    <Link href="/"><FaPinterest size={20} /></Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
