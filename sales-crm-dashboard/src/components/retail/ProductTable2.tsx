import React, { useEffect, useState } from 'react';

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

const ProductTable2: React.FC = () => {
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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error fetching products: {error}</p>;
    }

    return (
        <div>
            <h2>Product List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {filteredProducts.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Short ID</th>
                                <th>Product Name</th>
                                <th>Brand Name</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product.productShortId}>
                                    <td>{product.productShortId}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.brandName}</td>
                                    <td>{product.productQuantity}</td>
                                    <td>{product.category}</td>
                                    <td>${product.profit.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductTable2;
