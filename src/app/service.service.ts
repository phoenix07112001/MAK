import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:5175/DBClass'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetTypeDetails`);
  }

  addType(typeData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddTypeDetails`, typeData);
  }

  deleteType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteTypeDetails/${id}`);
  }

  UpdateType(typeData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateTypeDetails`, typeData);
  }

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetCategories`);
  }

  addCategory(CategoryData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddCategoryDetails`, CategoryData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteCategoryDetails/${id}`);
  }
  
  UpdateCategory(CategoryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateCategoryDetails`, CategoryData);
  }

  
  getBrand(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetBrandDetails`);
  }
  
  addBrand(BrandData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddBrandDetails`, BrandData);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeletebrandDetails/${id}`);
  }
  
  UpdateBrand(BrandData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateBrandDetails`, BrandData);
  }
  
  getProduct(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetProductDetails`);
  }

  getCategoryNames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetCategory`);
  }
  getBrandNames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetBrand`);
  }
  getTypeNames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetType`);
  }
  
  // addProduct(ProductData: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/AddProductDetails`, ProductData);
  // }

  addProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddProductDetails`, productData);
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeletetProductDetails/${id}`);
  }
  
  UpdateProduct(ProductData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateProductDetails`, ProductData);
  }
}
