// src/services/productService.ts

import axios from 'axios';

export const getBrandsByBranch = async (branchShortId: string) => {
  try {
    const response = await axios.get<string[]>(`http://localhost:5003/api/product/brands/branch/${branchShortId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Could not fetch brands');
  }
};
