import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  faArrowLeft  = faArrowLeft;

  post : any = [];

  constructor(private activatedRoute:ActivatedRoute,
    private publicacionesService:PublicacionesService) { }

  ngOnInit(): void {
    let idPost = this.activatedRoute.snapshot.params.id;
    this.publicacionesService.getAllInfoPost(idPost)
    .subscribe(res => {
      console.log(res);
      this.post = res[0];
    }, error => console.log(error));
    
  }

}
