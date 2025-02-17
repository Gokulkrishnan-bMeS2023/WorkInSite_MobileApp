// import axios from 'axios';
// import { PurchaseMaterial, PurchaseMaterialCreationRequest, PurchaseMaterialUpdationRequest } from '../screens/PurchaseMaterial/DTOs/PurchaseMaterialProps';
// export const usePurchaseMaterialService = () => {
//   const baseUrl = 'https://workinsite-test-api.onrender.com/PurchaseMaterial'; // Update URL if needed
//   // Fetch all purchase materials with optional search
//   const getPurchaseMaterials = async (searchString: string = ''): Promise<PurchaseMaterial[]> => {
//     const response = await axios.get(`${baseUrl}?q=${searchString}`);
//     return response.data;
//   };
//   // Fetch specific purchase material by ID
//   const getPurchaseMaterial = async (id: number): Promise<PurchaseMaterial> => {
//     const response = await axios.get(`${baseUrl}/${id}`);
//     return response.data;
//   };
//   // Create a new purchase material entry
//   const createPurchaseMaterial = async (purchaseMaterial: PurchaseMaterialCreationRequest): Promise<void> => {
//     await axios.post(baseUrl, purchaseMaterial);
//   };
//   // Update an existing purchase material entry
//   const updatePurchaseMaterial = async (id: number, purchaseMaterial: PurchaseMaterialUpdationRequest): Promise<void> => {
//     await axios.put(`${baseUrl}/${id}`, purchaseMaterial);
//   };
//   // Delete a purchase material entry
//   const deletePurchaseMaterial = async (id: number): Promise<void> => {
//     await axios.delete(`${baseUrl}/${id}`);
//   };
//   return {
//     getPurchaseMaterials,
//     getPurchaseMaterial,
//     createPurchaseMaterial,
//     updatePurchaseMaterial,
//     deletePurchaseMaterial,
//   };
// };
