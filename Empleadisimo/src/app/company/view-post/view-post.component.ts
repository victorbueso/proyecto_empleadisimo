import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  faArrowLeft  = faArrowLeft;
  faPen = faPen;
  faTimes = faTimes;

  post : any = [];

  constructor(private activatedRoute:ActivatedRoute,
    private publicacionesService:PublicacionesService) { }

  ngOnInit(): void {
    let idPost = this.activatedRoute.snapshot.params.id;
    this.publicacionesService.getAllInfoPost(idPost)
    .subscribe(res => {
      console.log(res);
      this.post = res[0];
      this.post.fechaVencimiento = new Date(res[0].fechaVencimiento);
      this.post.fechaPublicacion = new Date(res[0].fechaPublicacion);
      if(this.post.modalidad == 1){
        this.post.modalidad = 'Presencial'
      } else if(this.post.modalidad == 2){
        this.post.modalidad = 'Semipresencial'
      } else if(this.post.modalidad == 3){
        this.post.modalidad = 'Virtual'
      }
    }, error => console.log(error));
    
  }

}
