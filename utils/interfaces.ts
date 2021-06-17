export interface IGrades {
  date: String;
  grades: String;
  scroe: Number;
}

export interface IAdress{
  building: String;
  coord: number[];
  street: String;
  zipcode: String;
}

export interface IRestaurant {
  _id?: String;
  grades: IGrades[];
  address: IAdress;
  borough: String;
  cuisine: String;
  name: String;
  restaurant_id: String;
}

