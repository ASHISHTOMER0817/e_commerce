interface Product {
      imgUrl:string,
      name:string,
      price:number,
      colors:string[],
      selectedTags:string[],
      _id:string
};

interface User {
      name:string,
      password:string
};

interface Order {
      user:User,
      product:Product
}

export type {Product, User, Order};
