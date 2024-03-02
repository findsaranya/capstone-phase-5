import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreService } from 'src/app/admin/genre';
import { environment } from 'src/environments/environment.development';
import { IGenre } from 'src/app/shared';
import {Observable,map,of} from "rxjs";
import { ActivatedRoute, RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLinkWithHref],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  genre$:Observable<IGenre[]> = of([]);
  showCarousel = true;
  private genreService = inject(GenreService);
  private _route = inject(ActivatedRoute);

  ngOnInit():void{
   this.showCarousel = !this._route.snapshot.params['genreId'] ? true : false;
   console.log(this._route.snapshot.params['genreId'],this._route.snapshot.params['genreId'])
    this.genre$ = this.genreService.getAllGenres({page:0,size:environment.pageSize}).pipe(map(response => response.genreList));
  }
}
