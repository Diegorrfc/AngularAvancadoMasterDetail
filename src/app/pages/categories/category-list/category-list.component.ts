import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../Shared/category.service';
import { Category } from '../Shared/Category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {

    this.categoryService.getAll()
      .subscribe(
        cat => this.categories = cat,
        error => alert('erro')

      );
  }
  deleteCategory(category) {
    const mustDelete = confirm('Deseja excluir esse item?');
    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(ele => ele !== category),
        () => alert('erro ao tentar excluir')
      );
    }    
  }

}
