import { Component, OnInit } from '@angular/core';
import { Artist } from '../_models';
import { ArtistService } from '../_services';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'updateArtistDialog.component.html',
})
export class UpdateArtistDialogComponent {
  currentArtist: any = {};
  artistService: ArtistService;
  constructor(public dialogRef: MdDialogRef<UpdateArtistDialogComponent>) {}

  updateArtist() {
    console.log(`Le pego al server con ${JSON.stringify(this.currentArtist)}`);
    this.artistService.update(this.currentArtist).subscribe(() => this.dialogRef.close());
  }

  deleteArtist() {
    console.log(`Elimino a ${JSON.stringify(this.currentArtist.id)}`);
    this.artistService.delete(this.currentArtist.id).subscribe(() => this.dialogRef.close());
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
    console.log(JSON.stringify(this.selected));
    let dialogRef:MdDialogRef<UpdateArtistDialogComponent> = this.dialog.open(UpdateArtistDialogComponent);
    dialogRef.componentInstance.currentArtist = this.selected[0];
    dialogRef.componentInstance.artistService = this.artistService;
    dialogRef.afterClosed().subscribe(() => this.loadAllArtists());
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
}
