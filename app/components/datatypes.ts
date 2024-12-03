interface Clothes {
      url:string,
      name:string,
      price:number,
      _id:string
};

interface User {
      name:string,
      password:string
};

interface Order {
      user:User,
      product:Clothes
}

export type {Clothes, User, Order};
