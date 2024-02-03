import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class Localstorageservice {

  private readonly secretKey = 'temporaly-secret-key';


  constructor() { }

  getItem(key: string): any {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (encryptedValue) {
        const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
        const jsonString = decryptedValue.toString(CryptoJS.enc.Utf8);
  
        try {
          // Intentar analizar la cadena JSON
          return JSON.parse(jsonString);
        } catch (parseError) {
          console.error(`Error parsing JSON for key '${key}':`, parseError);
          return null;
        }
      }
      return null;
    } catch (error) {
      console.error(`Error retrieving item with key '${key}':`, error);
      return null;
    }
  }
  setItem(key: string, value: any): void {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
    localStorage.setItem(key, encryptedValue);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
