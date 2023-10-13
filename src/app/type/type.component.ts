import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  @ViewChild('content') modalContent: any;
  searchText: string = '';
  searchPerformed = false;
  types: any[] = [];
  editType: any = {
    id: '',
    created_date: new Date().toISOString(), // Set the current date and time as the created_date
    modified_date: new Date().toISOString() // Set the current date and time as the modified_date
  };
  editedData: any = {};
  currentPage = 1; // Current page number
  itemsPerPage = 10; // Number of items to display per page
  displayedTypes: any[] = this.types;
  isEditMode = false;
  isAddMode = true;

  get totalPages(): number {
    return Math.ceil(this.types.length / this.itemsPerPage);
  }

  get displayedtypes(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.types.slice(startIndex, endIndex);
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
  // searchTypes() {
  //   if (this.searchText) {
  //     this.displayedTypes = this.types.filter(type =>
  //       type.name.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //   } else {
  //     // If the search text is empty, show all types
  //     this.displayedTypes = this.types;
  //   }
  // }
  searchTypes() {
    console.log('Search text:', this.searchText);
  
    // Make an HTTP GET request to your API with the searchText
    this.http.get<any[]>(`http://localhost:5175/DBClass/GetTypeDetails/${this.searchText}`).subscribe(
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
  
  

  constructor(private sService: ServiceService, private modalService: NgbModal, private http: HttpClient,) {}

  ngOnInit(): void {
    this. loadTypes()
    
  }

  loadTypes(): void {
    this.sService.getTypes().subscribe((data) => {
      this.types = data;
    });
  
  }
  addRecord(): void {
    this.clearEdit();
    this.editedData.created_date = new Date().toISOString();
    this.editedData.modified_date = new Date().toISOString();
    // Send a request to your service to add a new record
    this.sService.addType(this.editedData).subscribe(() => {
      // Clear the editType object
      this.clearEdit();
      // Refresh the table or perform any other necessary actions
      this.loadTypes();
    });
    this.modalService.dismissAll();
  }
  // addRecord(): void {
  //   this.isEditMode = false;
  //   this.clearEdit();
  //   this.editType.created_date = new Date().toISOString();
  //   this.editType.modified_date = new Date().toISOString();
    
  //   // Ensure that the 'id' property is set to a number
  //   this.editType.id = +this.editType.id; // Convert to a number
    
  //   // Send a request to your service to add a new record
  //   this.sService.addType(this.editType).subscribe(() => {
  //     // Clear the editType object
  //     this.clearEdit();
  //     // Refresh the table or perform any other necessary actions
  //     this.loadTypes();
  //   });
  // }
  
  
  

  editRecord(type: any): void {
    this.isEditMode = true;
    this.editType = { ...type };
    console.log('editType:', this.editType); // Copy the type data to editType object
  }

  // Method to clear the editType object
  clearEdit(): void {
    this.editType = {};
  }

  // Method to update the record using the editType data
  updateRecord(): void {
    // this.editType.created_date = new Date().toISOString();
    this.editType.modified_date = new Date().toISOString();
    // Send a request to your service to update the record
    this.sService.UpdateType(this.editType).subscribe(() => {
      // Clear the editType object
      this.clearEdit();
      // Refresh the table after successful update
      this.loadTypes();
    });
  }

  deleteType(id: number): void {
    this.sService.deleteType(id).subscribe(() => {
      // Refresh the table after successful deletion
      this.loadTypes();
    });
  }
  // submitForm(): void {
  //   if (this.isAddMode) {
  //     // Handle Add operation
  //     this.addRecord();
  //   } else {
  //     // Handle Edit operation
  //     this.updateRecord();
  //   }
  // }
  

  onPageChange(pageNumber: number): void {
    // Handle page change here, e.g., update the displayed data
    // You can slice the 'this.types' array to display data for the selected page
    // Example: this.displayedData = this.types.slice((pageNumber - 1) * this.itemsPerPage, pageNumber * this.itemsPerPage);
    this.currentPage = pageNumber;
  }
  

  openEditModal(item: any) {
    this.editedData = { ...item };
    this.modalService.open(this.modalContent, { centered: true });
  }

 

}
