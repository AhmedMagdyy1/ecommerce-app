export interface Category {
    image:string,
    name:string,
    data:     list[];
}


export interface list {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
}