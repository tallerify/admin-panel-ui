import { Component, OnInit } from '@angular/core';
import { Artist } from '../_models';
import { ArtistService } from '../_services';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
  providers: [ArtistService]
})

export class ArtistsComponent implements OnInit {
  columns: any[] = [{ name: 'Id' }, { name: 'Name' }, { name: 'Description' }];
  artists: Artist[] = [];
  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.loadAllArtists();
  }

  deleteArtist(id: number) {
    this.artistService.delete(id).subscribe(() => this.loadAllArtists());
  }
  private loadAllArtists() {
    this.artistService.getAll().subscribe(res => { this.artists = res.artists });
  }
}
