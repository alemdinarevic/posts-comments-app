export type User = {
    id: 1,
    name: string,
    username: string,
    email: string,
    address: UserAddress
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }  
}

export type UserAddress = {
    street: string,
    suite: string,
    city: string,
    zipcode: number,
    geo: {
      lat: number,
      lng: number
    }
}