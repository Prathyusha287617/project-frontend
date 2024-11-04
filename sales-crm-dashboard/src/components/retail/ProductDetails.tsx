// ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

const ProductDetails: React.FC = () => {
    const { productShortId } = useParams<{ productShortId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5003/api/product/shortId/${productShortId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productShortId]);

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <div className="p-4">
            <button onClick={() => navigate(-1)} className="p-2 bg-blue-500 text-white rounded mb-4">
                Back to Product List
            </button>
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="p-4 border border-gray-300 rounded">
                <p><strong>Product Short ID:</strong> {product.productShortId}</p>
                <p><strong>Product Name:</strong> {product.productName}</p>
                <p><strong>Brand Name:</strong> {product.brandName}</p>
                <p><strong>Quantity:</strong> {product.productQuantity}</p>
                <p><strong>Threshold:</strong> {product.threshold}</p>
                <p><strong>Restock Quantity:</strong> {product.restockQuantity}</p>
                <p><strong>Needs Restock:</strong> {product.needsRestock ? 'Yes' : 'No'}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Actual Price:</strong> ${product.actualPrice.toFixed(2)}</p>
                <p><strong>Selling Price:</strong> ${product.sellingPrice.toFixed(2)}</p>
                <p><strong>Profit:</strong> ${product.profit.toFixed(2)}</p>
                <p><strong>Branch IDs:</strong> {product.branchShortId.join(', ')}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
