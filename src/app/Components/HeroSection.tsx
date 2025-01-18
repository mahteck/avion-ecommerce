import Link from "next/link";

export default function Hero() {
    return (
        // <div>
        //     {/* Hero Section */}
        //     <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        //         {/* Left */}
        //         <div className="bg-heroLeft text-white p-8 flex flex-col justify-center">
        //             <h2 className="text-4xl font-bold mb-6">
        //                 The furniture brand for the future, with timeless designs
        //             </h2>
        //             <Link href="/ProductListing"><button className="bg-gray-700 px-6 py-3 rounded-md hover:bg-gray-600">
        //                 View Collection
        //             </button></Link>
        //             <p className="mt-6">
        //                 A new era in eco-friendly furniture with Avelon, the French luxury
        //                 retail brand with tasteful colors and modern web technologies.
        //             </p>
        //         </div>
        //         {/* Right */}
        //         <div className="bg-heroRight flex items-center justify-center">
        //             <img
        //                 src="/images/Right-Image.png"
        //                 alt="Chair"
        //             // width={300}
        //             // height={300}
        //             />
        //         </div>
        //     </section>
        // </div>

        // <div>
        //     {/* Hero Section */}
        //     {/* w-full min-h-screen */}
        //     <section className=" flex items-center justify-center px-4 md:px-8 mt-0 mb-0">
        //         <div className="w-full h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 px-0">
        //             {/* Left */}
        //             <div className="bg-heroLeft text-white p-6 md:p-8 flex flex-col justify-center space-y-6">
        //                 <h2 className="text-2xl md:text-4xl font-bold mt-4 md:mt-4 max-w-lg">
        //                     The furniture brand for the future, with timeless designs
        //                 </h2>
        //                 <Link href="/ProductListing">
        //                     <button className="bg-gray-700 px-6 py-3 rounded-md hover:bg-gray-600 mt-6">
        //                         View Collection
        //                     </button>
        //                 </Link>
        //                 <p className="md:mb-4 text-sm md:text-base max-w-lg">
        //                     A new era in eco-friendly furniture with Avelon, the French luxury
        //                     retail brand with tasteful colors and modern web technologies.
        //                 </p>
        //             </div>
        //             {/* Right */}
        //             <div className="bg-heroRight flex items-center justify-center p-0">
        //                 <img
        //                     src="/images/Right-Image.png"
        //                     alt="Chair"
        //                     className="object-cover w-full h-full max-w-[500px] md:max-w-[700px] mx-auto"
        //                 />
        //             </div>
        //         </div>
        //     </section>
        // </div>

        <div className=" relative mx-auto h-[502px] md:h-[584px] justify-center items-center md:my-[3rem] flex flex-col md:flex-row lg:gap-0 md:gap-0 gap-[2rem] md:mx-[2rem] lg:mx-[4rem] xl:mx-[6.5rem] hero">
            <div className="bg-darkPrimary h-[584px]">
                <div className="relative px-10 md:px-6 lg:px-[3.5rem]">
                    <h2 className="font-clash font-normal  leading-[44.8px] text-white text-3xl lg:text-4xl md:pt-[4rem]">
                        The furniture brand for the future, with timeless designs
                    </h2>
                </div>
                <div className="px-[3.2rem] font-satoshi font-normal flex flex-col gap-10">
                    <p className="leading-[27px] md:relative lg:w-[602px] md:w-full text-white text-lg md:pt-[20rem]">
                        A new era in eco friendly furniture with Avelon, the French luxury
                        retail brand with nice fonts, tasteful colors and a beautiful way to
                        display things digitally using modern web technologies.
                    </p>
                    <Link href="/ProductListing"><button className="w-full md:relative md:w-[188px] md:bottom-[25rem] py-[16px] px-[32px] bg-[#f9f9f9] bg-opacity-[15%] leading-6 text-white font-satoshi font-normal hover:bg-lightGray hover:text-darkBlue transition-all duration-300 ease-in-out">
                        View collection
                    </button></Link>
                </div>
            </div>
            <div className="relative  w-[900px] h-[584px] md:block hidden image">
                <img
                    src="/images/Right-Image.png"
                    alt="Chair"
                    width={200}
                    height={200}
                    className="w-full lg:w-[520px] h-[584px]"
                />
            </div>
        </div>

    );
}
