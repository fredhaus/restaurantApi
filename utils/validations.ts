import { IRestaurant } from "./interfaces";

export const isValidRestaurant = (requestBody: IRestaurant): requestBody is IRestaurant => {
  const minimalValidKeys =  ["address", "borough", "cuisine", "name"] 
  return minimalValidKeys.every((key: string) => Object.keys(requestBody).includes(key))
}