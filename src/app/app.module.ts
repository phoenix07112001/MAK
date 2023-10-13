import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ContentComponent } from './content/content.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { TypeComponent } from './type/type.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component'; 

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ContentComponent,
    BrandComponent,
    CategoryComponent,
    TypeComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
