import React, { useEffect, useState } from 'react';
import '../../styles/ProductTable.module.css';

interface Product {
    productShortId: string;
    productName: string;
    brandName: string;
    productQuantity: number;
    threshold: number;
    restockQuantity: number;
    needsRestock: boolean;
    description: string;
    category: string;
    actualPrice: number;
    sellingPrice: number;
    profit: number;
    branchShortId: string[];
}

const ProductTable: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const branchShortId = sessionStorage.getItem('branchShortId');
                if (!branchShortId) {
                    throw new Error('Branch Short ID not found in localStorage');
                }

                const response = await fetch(`http://localhost:5003/api/product/branch/${branchShortId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Calculate current products based on page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    if (loading) {
        return <p className="text-center text-lg font-semibold">Loading products...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center font-semibold">Error fetching products: {error}</p>;
    }

    return (
        <div className="table-container p-4 bg-gray-50 min-h-screen">
            <h2 className="title text-2xl font-bold text-center mb-6">Product List</h2>
            {/* Search Bar */}
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded w-1/3"
                />
            </div>
            {filteredProducts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse shadow-lg">
                        <thead className="table-header bg-gray-300 text-gray-800 uppercase text-sm">
                            <tr>
                                <th className="p-3 border">Product Short ID</th>
                                <th className="p-3 border">Product Name</th>
                                <th className="p-3 border">Brand Name</th>
                                <th className="p-3 border">Quantity</th>
                                <th className="p-3 border">Category</th>
                                <th className="p-3 border">Profit</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {currentProducts.map((product) => (
                                <tr key={product.productShortId} className="hover:bg-gray-200">
                                    <td className="p-3 border">{product.productShortId}</td>
                                    <td className="p-3 border">{product.productName}</td>
                                    <td className="p-3 border">{product.brandName}</td>
                                    <td className="p-3 border">{product.productQuantity}</td>
                                    <td className="p-3 border">{product.category}</td>
                                    <td className="p-3 border">${product.profit.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                        <button
                            className="mx-1 p-2 border border-gray-300 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`mx-1 p-2 border border-gray-300 bg-gray-200 rounded hover:bg-gray-300 ${
                                    currentPage === index + 1 ? 'bg-gray-400' : ''
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="mx-1 p-2 border border-gray-300 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p className="no-products text-center text-gray-500">No products found.</p>
            )}
        </div>
    );
};

export default ProductTable;
