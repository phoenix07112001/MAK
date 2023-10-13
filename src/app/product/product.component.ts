import { Component, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @ViewChild('content') modalContent: any;
  @ViewChild('contentt') modalContentt: any;
  selectedFile: File | undefined;
  products: any[] = [];
  editProduct: any = {
    Product: {
      id: null,
      name: "",
      desc: "",
      sku: "",
      price: null,
      quantity: null,
      created_date: new Date().toISOString(),
      modified_date: new Date().toISOString(),
      discount_id: null,
      category_name: "",
      brand_name: "",
      type_name: "",
      ImageId: null,
      
    },
    ImagePath: ""
 };
//  editedData: any = {};
editedData: any = {
  Product: {
    id: null,
    name: "",
    desc: "",
    sku: "",
    price: null,
    quantity: null,
    created_date: new Date().toISOString(),
    modified_date: new Date().toISOString(),
    discount_id: null,
    category_name: "",
    brand_name: "",
    type_name: "",
    ImageId: null,
    
  },
  ImagePath: ""
};
  currentPage = 1; // Current page number
   itemsPerPage = 10; // Number of items to display per page
   searchPerformed = false;
   displayedTypes: any[] = this.products;
   searchText: string = '';
   categoryNames: string[] = [];
   brandNames: string[] = [];
   typeNames: string[] = [];
 
   // Calculate the total number of pages
   get totalPages(): number {
     return Math.ceil(this.products.length / this.itemsPerPage);
   }
 
   // Get the current page of items to display
   get displayedProducts(): any[] {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return this.products.slice(startIndex, endIndex);
   }
 
   // Function to change the current page
   setPage(pageNumber: number): void {
     if (pageNumber >= 1 && pageNumber <= this.totalPages) {
       this.currentPage = pageNumber;
     }
   }
 
   generatePageNumbers(): number[] {
     return Array(this.totalPages).fill(0).map((_, index) => index + 1);
   }
   
   getDynamicPageNumbers(): number[] {
     const startPage = Math.max(1, this.currentPage - 1);
     const endPage = Math.min(this.totalPages, this.currentPage + 1);
   
     const pageNumbers = [];
     for (let i = startPage; i <= endPage; i++) {
       pageNumbers.push(i);
     }
     return pageNumbers;
   }
 
   searchTypes() {
     console.log('Search text:', this.searchText);
   
     // Make an HTTP GET request to your API with the searchText
     this.http.get<any[]>(`http://localhost:5175/DBClass/GetProduct/${this.searchText}`).subscribe(
       (response) => {
         console.log('Response:', response); // Check the response from the API
   
         // Update the displayedTypes array with the search results
         this.displayedTypes = response;
         this.searchPerformed = true;
       },
       (error) => {
         console.error('Error fetching data:', error);
       }
     );
   }
   
 
   constructor(private sService: ServiceService,private modalService: NgbModal, private http: HttpClient,private route: Router) {}
 
   ngOnInit(): void {
    this.loadCategories();
    this.sService.getCategoryNames().subscribe((data: string[]) => {
      this.categoryNames = data; // Assign the fetched category names to the array
    });
    this.sService.getBrandNames().subscribe((data: string[]) => {
      this.brandNames = data; // Assign the fetched category names to the array
    });
    this.sService.getTypeNames().subscribe((data: string[]) => {
      this.typeNames = data; // Assign the fetched category names to the array
    });
  }
   
   loadCategories(): void {
     this.sService.getProduct().subscribe((data) => {
       this.products = data;
      //  this.displayedTypes = data;
     });
     // this.totalPages = Math.ceil(this.types.length / this.itemsPerPage);
   }
  //  addRecord(): void {
  //    this.clearEdit();
  //    this.editedData.created_date = new Date().toISOString();
  //    this.editedData.modified_date = new Date().toISOString();
  //    // Send a request to your service to add a new record
  //    this.sService.addProduct(this.editedData).subscribe(() => {
  //      // Clear the editType object
  //      this.clearEdit();
  //      // Refresh the table or perform any other necessary actions
  //      this.loadCategories();
  //    });
  //    this.modalService.dismissAll();
  //  }

  addRecord(): void {
    this.clearEdit();
    this.editedData.Product.created_date = new Date().toISOString();
    this.editedData.Product.modified_date = new Date().toISOString();
    console.log('Data to be sent to the API:', this.editedData);
  
    if (!this.selectedFile) {
      console.error('File is missing.');
      return;
    }
  
    const formData = new FormData();
    formData.append('Product', JSON.stringify(this.editedData.Product)); // Include only the Product object
    formData.append('Image', this.selectedFile);
  
    // Set the headers to specify the content type as 'multipart/form-data'
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data'); // Remove the trailing semicolon
  
    // Send a POST request to your API to add the product with image
    this.http
      .post<any>('http://localhost:5175/DBClass/AddProductDetails', formData, { headers: headers })
      .subscribe(
        (response) => {
          // Handle the successful response from the API
          console.log('Product added successfully:', response);
  
          // Clear the form and selected file
          this.clearEdit();
          this.selectedFile = undefined;
  
          // Refresh the table or perform any other necessary actions
          this.loadCategories();
          window.location.reload();
        },
        (error) => {
          // Handle errors from the API
          console.error('Error adding product:', error);
        }
      );
    
    this.modalService.dismissAll();
  }
  
  
 
   editRecord(type: any): void {
     this.editProduct.Product = { ...type };
     console.log('editType:', this.editProduct.Product); // Copy the type data to editType object
   }
 
   // Method to clear the editType object
   clearEdit(): void {
     this.editProduct = {};
   }
 
   // Method to update the record using the editType data
  //  updateRecord(): void {
  //    this.editProduct.created_date = new Date().toISOString();
  //    this.editProduct.modified_date = new Date().toISOString();
  //    // Send a request to your service to update the record
  //    this.sService.UpdateProduct(this.editProduct).subscribe(() => {
  //      // Clear the editType object
  //      this.clearEdit();
  //      // Refresh the table after successful update
  //      this.loadCategories();
  //    });
  //  }

  // updateRecord(): void {
  //   this.editProduct.Product.created_date = new Date().toISOString();
  //   this.editProduct.Product.modified_date = new Date().toISOString();
  //   // Send a request to your service to update the record
  //   if (!this.selectedFile) {
  //     console.error('File is missing.');
  //     return;
  //   }
    
  //   const formData = new FormData();
  //   formData.append('Product', JSON.stringify(this.editProduct.Product)); // Include only the Product object
  //   formData.append('Image', this.selectedFile);
    
  //   // Set the headers to specify the content type as 'multipart/form-data'
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data'); // Remove the trailing semicolon
    
  //   // Send a PUT request to your API to update the product with image
  //   this.http
  //     .put<any>('http://localhost:5175/DBClass/UpdateProductDetails', formData, { headers: headers })
  //     .subscribe(
  //       (response) => {
  //         this.route.navigate(['/product']);
  //         // Handle the successful response from the API
  //         console.log('Product updated successfully:', response);
    
  //         // Clear the form and selected file
  //         this.clearEdit();
  //         this.selectedFile = undefined;
    
  //         // Refresh the table or perform any other necessary actions
  //         this.loadCategories();
         
  //       },
  //       (error) => {
  //         // Handle errors from the API
  //         console.error('Error updating product:', error);
  //       }
  //     );
    
  // }

  updateRecord(): void {
    this.editProduct.Product.created_date = new Date().toISOString();
    this.editProduct.Product.modified_date = new Date().toISOString();
    // Send a request to your service to update the record
  
    const formData = new FormData();
    formData.append('Product', JSON.stringify(this.editProduct.Product)); // Include only the Product object
    
    // Check if a file is selected, and if so, append it to the form data
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
  
    // Set the headers to specify the content type as 'multipart/form-data'
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data'); // Remove the trailing semicolon
  
    // Send a PUT request to your API to update the product with or without image
    this.http
      .put<any>('http://localhost:5175/DBClass/UpdateProductDetails', formData, { headers: headers })
      .subscribe(
        (response) => {
          this.route.navigate(['/product']);
          // Handle the successful response from the API
          console.log('Product updated successfully:', response);
  
          // Clear the form and selected file
          this.clearEdit();
          this.selectedFile = undefined;
  
          // Refresh the table or perform any other necessary actions
          this.loadCategories();
          window.location.reload();

  
        },
        (error) => {
          // Handle errors from the API
          console.error('Error updating product:', error);
        }
      );
  }
  
 
   deleteRecord(id: number): void {
     this.sService.deleteProduct(id).subscribe(() => {
       // Refresh the table after successful deletion
       this.loadCategories();
       window.location.reload();
     });
   }
   openEditModal(item: any) {
     this.editedData = { ...item };
     this.modalService.open(this.modalContent, { centered: true, size: 'lg' });
   }
   openEditModal1(item: any) {
    this.editProduct = { ...item };
    this.modalService.open(this.modalContentt, { centered: true, size: 'lg' });
  }

   onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0]; // Get the first selected file
    }
  }
 
 }
