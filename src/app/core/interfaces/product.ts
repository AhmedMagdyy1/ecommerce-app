export interface Product {
    imageCover:string,
    price:number,
    title:string,
    category:Category,
    ratingsAverage:number,
    id:string,
    description?:string,
    images?:string[]
}


interface Category {
    name:string
}
