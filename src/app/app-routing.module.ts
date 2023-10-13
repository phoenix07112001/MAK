import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//content
import { ContentComponent } from './content/content.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { TypeComponent } from './type/type.component';
import { ProductComponent } from './product/product.component'; 




const routes: Routes = [
  {path: '', component:ContentComponent},
  {path: 'test', component:ContentComponent},
  {path: 'brand', component:BrandComponent},
  {path: 'category', component:CategoryComponent},
  {path: 'type', component:TypeComponent},
  {path: 'product', component:ProductComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
