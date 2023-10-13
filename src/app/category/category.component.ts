import { Component, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @ViewChild('content') modalContent: any;

 categories: any[] = [];
 editCategory: any = {
  id: '',
  created_date: new Date().toISOString(), // Set the current date and time as the created_date
  modified_date: new Date().toISOString() // Set the current date and time as the modified_date
};
editedData: any = {};
 currentPage = 1; // Current page number
  itemsPerPage = 10; // Number of items to display per page
  searchPerformed = false;
  displayedTypes: any[] = this.categories;
  searchText: string = '';


  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.categories.length / this.itemsPerPage);
  }

  // Get the current page of items to display
  get displayedCategories(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.categories.slice(startIndex, endIndex);
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
    this.http.get<any[]>(`http://localhost:5175/DBClass/GetCategory/${this.searchText}`).subscribe(
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
   this.loadCategories();
  }
  loadCategories(): void {
    this.sService.getCategory().subscribe((data) => {
      this.categories = data;
    });
    // this.totalPages = Math.ceil(this.types.length / this.itemsPerPage);
  }
  addRecord(): void {
    this.clearEdit();
    this.editedData.created_date = new Date().toISOString();
    this.editedData.modified_date = new Date().toISOString();
    // Send a request to your service to add a new record
    this.sService.addCategory(this.editedData).subscribe(() => {
      // Clear the editType object
      this.clearEdit();
      // Refresh the table or perform any other necessary actions
      this.loadCategories();
    });
    this.modalService.dismissAll();
  }

  editRecord(type: any): void {
    this.editCategory = { ...type };
    console.log('editType:', this.editCategory); // Copy the type data to editType object
  }

  // Method to clear the editType object
  clearEdit(): void {
    this.editCategory = {};
  }

  // Method to update the record using the editType data
  updateRecord(): void {
    // this.editType.created_date = new Date().toISOString();
    this.editCategory.modified_date = new Date().toISOString();
    // Send a request to your service to update the record
    this.sService.UpdateCategory(this.editCategory).subscribe(() => {
      // Clear the editType object
      this.clearEdit();
      // Refresh the table after successful update
      this.loadCategories();
    });
  }

  deleteRecord(id: number): void {
    this.sService.deleteCategory(id).subscribe(() => {
      // Refresh the table after successful deletion
      this.loadCategories();
    });
  }
  openEditModal(item: any) {
    this.editedData = { ...item };
    this.modalService.open(this.modalContent, { centered: true });
  }
}
