import { Component, OnInit } from '@angular/core';
import { Album } from '../_models';
import { AlbumService } from '../_services';
import { MdDialog, MdDialogRef } from '@angular/material';
import '../../../node_modules/@swimlane/ngx-datatable/release/index.css';
import '../../../node_modules/@swimlane/ngx-datatable/release/themes/material.css';
import '../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'updateAlbumDialog.component.html',
  styleUrls: ['./albums.component.css']
})

export class UpdateAlbumDialogComponent {
  currentAlbum: any;
  albumService: AlbumService;
  constructor(public dialogRef: MdDialogRef<UpdateAlbumDialogComponent>) {}

  private formatCurrentAlbum() : Album {
    let genres = this.currentAlbum.genres; 
    if (this.currentAlbum.genres.indexOf(',') > -1) 
      genres = this.currentAlbum.genres.split(',');
    return {...this.currentAlbum, 
      artists: this.currentAlbum.artists.map(artist => String(artist.id)),
      genres
    };
  }

  updateAlbum() {
    this.albumService.update(this.formatCurrentAlbum()).subscribe(() => this.dialogRef.close());
  }

  deleteAlbum() {
    this.albumService.delete(this.currentAlbum.id).subscribe(() => this.dialogRef.close());
  }
}

@Component({
  selector: 'app-create-album',
  templateUrl: 'createAlbumDialog.component.html',
  styleUrls: ['./albums.component.css']
})

export class CreateAlbumDialogComponent {
  newAlbum: any = {};
  albumService: AlbumService;
  constructor(public dialogRef: MdDialogRef<CreateAlbumDialogComponent>) {}

  imageUpload(event) {
    const fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        const file: File = fileList[0];
        this.newAlbum = {...this.newAlbum, avatar: file};
    }
  }

  createAlbum() {
    this.albumService.create(this.newAlbum).subscribe(() => this.dialogRef.close());
  }
}

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [AlbumService]
})

export class AlbumsComponent implements OnInit {
  columns: any[] = [
    { name: 'Id', value: 'id' },
    { name: 'Name' },
    { name: 'Release date' },
    { name: 'Genres' },
  ];
  albumFieldsMap: any = {
    'Id': 'id',
    'Name': 'name',
    'Release date': 'releaseDate',
    'Genres': 'genres',
  };
  selectedColumn: string = this.columns[1].name;
  albums: Album[] = [];
  temp: Album[] = [];
  selected: Album[] = [];
  constructor(private albumService: AlbumService, public dialog: MdDialog) {}

  ngOnInit() {
    this.loadAllAlbums();
  }

  deleteAlbum(id: number) {
    this.albumService.delete(id).subscribe(() => this.loadAllAlbums());
  }

  private loadAllAlbums() {
    this.albumService.getAll().subscribe(res => {
      this.temp = [...res.albums];
      this.albums = res.albums;
    });
  }

  updateFilter(columnName, event) {
    const columnNameLower = this.albumFieldsMap[columnName];
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(d => {
      if (['Name', 'Release date'].includes(columnName))
        return d[columnNameLower].toLowerCase().indexOf(val) !== -1 || !val;
      return d[columnNameLower] == val || !val;
    });
    this.albums = temp;
  }

  onSelect({ selected }) {
    let dialogRef:MdDialogRef<UpdateAlbumDialogComponent> = this.dialog.open(UpdateAlbumDialogComponent);
    dialogRef.componentInstance.currentAlbum = this.selected[0];
    dialogRef.componentInstance.albumService = this.albumService;
    dialogRef.afterClosed().subscribe(() => this.loadAllAlbums());
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  createAlbum(event) {
    let dialogRef:MdDialogRef<CreateAlbumDialogComponent> = this.dialog.open(CreateAlbumDialogComponent);
    dialogRef.componentInstance.albumService = this.albumService;
    dialogRef.afterClosed().subscribe(() => this.loadAllAlbums());
  }
}
