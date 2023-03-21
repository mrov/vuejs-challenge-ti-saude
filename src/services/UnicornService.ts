// UnicornService.ts

import axios, { AxiosResponse } from 'axios';
import { IUnicorn } from '../types/Unicorn';

const API_URL =
  'https://crudcrud.com/api/e9ec0ac83cb24ccc8797616d2c069110/unicorns';

export default class UnicornService {
  public static getUnicorns(): Promise<IUnicorn[]> {
    return axios
      .get(API_URL)
      .then((response: AxiosResponse<IUnicorn[]>) => {
        return response.data;
      })
      .catch((error: Error) => {
        console.log(error);
        return [];
      });
  }

  public static createUnicorn(
    unicorn: IUnicorn | null
  ): Promise<IUnicorn | null> {
    return axios
      .post(API_URL, unicorn)
      .then((response: AxiosResponse<IUnicorn>) => {
        return response.data;
      })
      .catch((error: Error) => {
        console.log(error);
        return null;
      });
  }

  public static updateUnicorn(
    unicorn: IUnicorn | null
  ): Promise<IUnicorn | null> {
    return axios
      .put(`${API_URL}/${unicorn?._id}`, unicorn)
      .then((response: AxiosResponse<IUnicorn>) => {
        return response.data;
      })
      .catch((error: Error) => {
        console.log(error);
        return null;
      });
  }

  public static deleteUnicorn(unicornId: string): Promise<boolean> {
    return axios
      .delete(`${API_URL}/${unicornId}`)
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        console.log(error);
        return false;
      });
  }
}
