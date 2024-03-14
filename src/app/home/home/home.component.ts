import { HomeService } from './../services/home.service';
import { Component, OnInit } from '@angular/core';
import { Bath } from '../model/Bath';
import { Observable, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  baths$: Observable<Bath[]>;
  displayedColumns = ['date', 'name', 'category', 'time'];
  bathsDataSource: MatTableDataSource<Bath> = new MatTableDataSource<Bath>();

  constructor(private homeService: HomeService, public dialog: MatDialog) {
    this.baths$ = this.homeService.list().pipe(
      catchError((error) => {
        this.onError('Falha ao carregar dados.')
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.baths$.subscribe((data) => {
      this.bathsDataSource.data = data;
    });
  }
}
