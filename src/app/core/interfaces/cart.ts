export interface Cart {
    numOfCartItems:number,
    data:Data
}

interface Data {
    totalCartPrice:number
    products:Products[]
    _id:string
}

interface Products {
    count:number,
    price:number,
    product:InnerProduct
}

interface InnerProduct{
    imageCover:string,
    // quantity:number,
    // ratingsAverage:number,
    title:string
    category:ProductCategory
    id:string
}


interface ProductCategory{
    // image:string,
    name:string,
    // slug:string
}