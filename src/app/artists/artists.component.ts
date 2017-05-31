import { Component, OnInit } from '@angular/core';
// import { UpdateArtistDialogComponent } from './updateArtistDialog.component';
import { Artist } from '../_models';
import { ArtistService } from '../_services';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 md-dialog-title>Update Artist
  <button md-button (click)="deleteArtist()">Delete</button>
  </h1>
  <div md-dialog-actions><button md-button (click)="updateArtist()">Say hi</button>
  <button md-button (click)="dialogRef.close('Chau')">Close</button>
  </div>`,
  providers: [ArtistService]
})
export class UpdateArtistDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<UpdateArtistDialogComponent>,
    private artistService: ArtistService) {}
  updateArtist() {
    console.log('hola gato');
  }
  deleteArtist() {
    console.log('borrando'); // TODO pasarle el id que quiere borrar
  }
}

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
  providers: [ArtistService]
})

export class ArtistsComponent implements OnInit {
  columns: any[] = [
    { name: 'Id' },
    { name: 'Name' },
    { name: 'Description' },
    { name: 'Popularity'},
    { name: 'Genres'},
    ];
  artists: Artist[] = [];
  temp: Artist[] = [];
  selected: Artist[] = [];
  constructor(private artistService: ArtistService, public dialog: MdDialog) {

  }

  ngOnInit() {
    this.loadAllArtists();
  }

  deleteArtist(id: number) {
    this.artistService.delete(id).subscribe(() => this.loadAllArtists());
  }

  private loadAllArtists() {
    this.artistService.getAll().subscribe(res => {
      this.temp = [...res.artists];
      this.artists = res.artists;
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(d => d.name.toLowerCase().indexOf(val) !== -1 || !val);

    // update the rows
    this.artists = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    // this.dialog.open(DialogOverviewExampleDialog);
  }

  onActivate(event) {
    console.log('Activate Event', event);
    this.dialog.open(UpdateArtistDialogComponent);
  }
}
