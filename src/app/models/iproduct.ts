export interface IProduct 
{
    id: number;
    productName: string;

    productPrice: number;
    quantity: number;
    
    description: string;
    imageUrl?: string;
    imageFile?: any;

}
