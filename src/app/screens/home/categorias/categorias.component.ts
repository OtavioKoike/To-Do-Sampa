import { PostService } from './../../../services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  @Input() categoria: string;

  posicoes = [0,1,2,3,4,5,6,7,8,9];

  lugares$: Observable<Post[]>;
  lugares: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.lugares$ = this.postService.get(this.categoria).valueChanges({idField : 'id'});
    this.lugares$.subscribe(lugares => {
      this.lugares = lugares;
      console.log(lugares)
    })
  }

}
