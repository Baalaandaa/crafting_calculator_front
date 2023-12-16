import axios from "axios";

import config from "../config";

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  website: string;
}

export interface InputItem {
  id: number;
  quantity: number;
}
export interface Recipe {
  recipe_id: number;
  recipe_name: string;
  item_id: number;
  factory_name: string;
  production_factory: number;
  FactoryId: number;
  belt_name: string;
  belt_quantity: number;
  input_items: InputItem[];
}
export interface Item {
  item_id: number;
  item_name: string;
  recipes: Recipe[];
}


export interface ItemList {
  data?: Item[];
  error?: Error;
}

interface UserList {
  data?: User[];
  error?: Error;
}

interface UserData {
  data?: User;
  error?: Error;
}

export const getUserList = async (): Promise<UserList> => {
  try {
    const { data } = await axios.get(`${config.API_URL}/users`);
    return { data };
  } catch (error) {
    return { error };
  }
};


export const getItemList = async (): Promise<ItemList> => {
  try {
    const { data } = await axios.get(`${config.API_URL}/items`);
    // console.log(data);
    return { data };
  } catch (error) {
    // console.log(error);
    return { error };
  }
};

export const getUserData = async (id: string): Promise<UserData> => {
  try {
    const { data } = await axios.get(`${config.API_URL}/users/${id}`);
    return { data };
  } catch (error) {
    return { error };
  }
};
