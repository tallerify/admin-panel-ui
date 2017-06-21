import { Component, OnInit } from '@angular/core';
import { Track } from '../_models';
import { TrackService } from '../_services';
import { MdDialog, MdDialogRef } from '@angular/material';
import '../../../node_modules/@swimlane/ngx-datatable/release/index.css';
import '../../../node_modules/@swimlane/ngx-datatable/release/themes/material.css';
import '../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'updateTrackDialog.component.html',
  styleUrls: ['./tracks.component.css']
})

export class UpdateTrackDialogComponent {
  currentTrack: any;
  trackService: TrackService;
  constructor(public dialogRef: MdDialogRef<UpdateTrackDialogComponent>) {}

  private formatCurrentTrack() : Track {
    if (this.currentTrack.genres.indexOf(',') > -1)
      return {...this.currentTrack, artists: this.currentTrack.artists.split(',')};
    return this.currentTrack;
  }

  updateTrack() {
    this.trackService.update(this.formatCurrentTrack()).subscribe(() => this.dialogRef.close());
  }

  deleteTrack() {
    this.trackService.delete(this.currentTrack.id).subscribe(() => this.dialogRef.close());
  }
}

@Component({
  selector: 'app-create-track',
  templateUrl: 'createTrackDialog.component.html',
  styleUrls: ['./tracks.component.css']
})

export class CreateTrackDialogComponent {
  newTrack: any = {};
  trackService: TrackService;
  constructor(public dialogRef: MdDialogRef<CreateTrackDialogComponent>) {}

  private formatNewTrack() : Track {
    return {...this.newTrack, artists: this.newTrack.artists.split(',') };
  }

  createTrack() {
    this.trackService.create(this.formatNewTrack()).subscribe(() => this.dialogRef.close());
  }
}

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css'],
  providers: [TrackService]
})

export class TracksComponent implements OnInit {
  columns: any[] = [
    { name: 'Id' },
    { name: 'Name' },
    { name: 'Album Id' },
    { name: 'Artists Ids'},
    { name: 'Popularity'},
    ];
  selectedColumn: string = this.columns[1].name;
  tracks: any[] = [];
  temp: Track[] = [];
  selected: Track[] = [];
  constructor(private trackService: TrackService, public dialog: MdDialog) {

  }

  ngOnInit() {
    this.loadAllTracks();
  }

  deleteTrack(id: number) {
    this.trackService.delete(id).subscribe(() => this.loadAllTracks());
  }

  private loadAllTracks() {
    this.tracks = [];
    this.trackService.getAll().subscribe(res => {
      this.temp = [...res.tracks];
      console.log(JSON.stringify(res.tracks));
      res.tracks.forEach(responseTrack => {
        this.tracks.push({
          id: responseTrack.id,
          name: responseTrack.name,
          albumId: responseTrack.album.id,
          artistsIds: responseTrack.artists.map(artist => artist.id).join(','),
          popularity: responseTrack.popularity
        });
      });
      console.log(JSON.stringify(this.tracks));
    });
  }

  updateFilter(columnName, event) {
    const columnNameLower = columnName.toLowerCase();
    const val = event.target.value.toLowerCase();
    console.log(columnName);
    console.log(val);

    // filter our data
    const temp = this.temp.filter(d => {
      if (columnName === 'Name' || columnName === 'Description')
        return d[columnNameLower].toLowerCase().indexOf(val) !== -1 || !val;
      if (columnName === 'Id' || columnName === 'Popularity')
        return d[columnNameLower] == val || !val;
      if (columnName === 'Genres')
        return d[columnNameLower].join(',').indexOf(val) !== -1 || !val;
    });

    console.log(JSON.stringify(temp));

    // update the rows
    this.tracks = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    console.log(JSON.stringify(this.selected));
    let dialogRef:MdDialogRef<UpdateTrackDialogComponent> = this.dialog.open(UpdateTrackDialogComponent);
    dialogRef.componentInstance.currentTrack = this.selected[0];
    dialogRef.componentInstance.trackService = this.trackService;
    dialogRef.afterClosed().subscribe(() => this.loadAllTracks());
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  createTrack(event) {
    let dialogRef:MdDialogRef<CreateTrackDialogComponent> = this.dialog.open(CreateTrackDialogComponent);
    dialogRef.componentInstance.trackService = this.trackService;
    dialogRef.afterClosed().subscribe(() => this.loadAllTracks());
  }
}
