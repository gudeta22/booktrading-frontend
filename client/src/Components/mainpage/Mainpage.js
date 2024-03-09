import React from 'react';

function Mainpage() {
    // Sample product data array
    const products = [
        {
            id: 1,
            brand: "Brand 1",
            name: "Product Name 1",
            price: 149,
            discountedPrice: 199,
            image: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            link: "https://www.example.com/product1"
        },
        {
            id: 2,
            brand: "Brand 2",
            name: "Product Name 2",
            price: 99,
            discountedPrice: 129,
            image: "https://images.unsplash.com/photo-1651950540805-b7c71869e689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            link: "https://www.example.com/product2"
        },
         {
            id: 1,
            brand: "Brand 1",
            name: "Product Name 1",
            price: 149,
            discountedPrice: 199,
            image: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            link: "https://www.example.com/product1"
        },
         {
            id: 1,
            brand: "Brand 1",
            name: "Product Name 1",
            price: 149,
            discountedPrice: 199,
            image: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            link: "https://www.example.com/product1"
        },
         {
            id: 1,
            brand: "Brand 1",
            name: "Product Name 1",
            price: 149,
            discountedPrice: 199,
            image: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            link: "https://www.example.com/product1"
        },
         {
            id: 1,
            brand: "Brand 1",
            name: "Product Name 1",
            price: 149,
            discountedPrice: 199,
            image: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            link: "https://www.example.com/product1"
        },
        // Add more products as needed
    ];

    return (
        <div>
            <section id='projects' className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5" >
                {/* Mapping product cards */}
                {products.map(product => (
                    <div key={product.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                        <a href={product.link}>
                            <img src={product.image} alt={product.name} className="h-80 w-72 object-cover rounded-t-xl" />
                            <div className="px-4 py-3 w-72">
                                <span className="text-gray-400 mr-3 uppercase text-xs">{product.brand}</span>
                                <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
                                    <del>
                                        <p className="text-sm text-gray-600 cursor-auto ml-2">${product.discountedPrice}</p>
                                    </del>
                                    <div className="ml-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Mainpage;
