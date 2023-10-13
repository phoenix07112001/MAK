import { Component, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  @ViewChild('content') modalContent: any;
  Brands: any[] = [];
  editBrand: any = {
    id: '',
    created_date: new Date().toISOString(), // Set the current date and time as the created_date
    modified_date: new Date().toISOString() // Set the current date and time as the modified_date
  };
  currentPage = 1; // Current page number
  itemsPerPage = 10; // Number of items to display per page
  editedData: any = {};
  searchPerformed = false;
  displayedTypes: any[] = this.Brands;
  searchText: string = '';
  get totalPages(): number {
    return Math.ceil(this.Brands.length / this.itemsPerPage);
  }

  // Get the current page of items to display
  get displayedBrands(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.Brands.slice(startIndex, endIndex);
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
    this.http.get<any[]>(`http://localhost:5175/DBClass/GetBrandDetails/${this.searchText}`).subscribe(
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

  constructor(private sService: ServiceService,private modalService: NgbModal, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBrand();
  }

  loadBrand(): void {
    this.sService.getBrand().subscribe((data) => {
      this.Brands = data;
    });
    // this.totalPages = Math.ceil(this.types.length / this.itemsPerPage);
  }

  addRecord(): void {
    this.clearEdit();
    this.editedData.created_date = new Date().toISOString();
    this.editedData.modified_date = new Date().toISOString();
    // Send a request to your service to add a new record
    this.sService.addBrand(this.editedData).subscribe(() => {
      // Clear the editType object
      this.clearEdit();
      // Refresh the table or perform any other necessary actions
      this.loadBrand();
    });
    this.modalService.dismissAll();
  }

  editRecord(type: any): void {
    this.editBrand = { ...type };
    console.log('editType:', this.editBrand); // Copy the type data to editType object
  }

  // Method to clear the editType object
  clearEdit(): void {
    this.editBrand = {};
  }

  // Method to update the record using the editType data
  updateRecord(): void {
    // this.editType.created_date = new Date().toISOString();
    this.editBrand.modified_date = new Date().toISOString();
    // Send a request to your service to update the record
    this.sService.UpdateBrand(this.editBrand).subscribe(() => {
      // Clear the editType object
      this.clearEdit();
      // Refresh the table after successful update
      this.loadBrand();
    });
  }

  deleteRecord(id: number): void {
    this.sService.deleteBrand(id).subscribe(() => {
      // Refresh the table after successful deletion
      this.loadBrand();
    });
  }
  openEditModal(item: any) {
    this.editedData = { ...item };
    this.modalService.open(this.modalContent, { centered: true });
  }

}
