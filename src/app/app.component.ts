import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, takeWhile } from 'rxjs';
import { PAGE } from 'src/shared/constant';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isIBooKView: boolean = false;
  public isValidPage: boolean = false;
  public editMode: boolean = false;
  private isComponentAlive!: boolean;
  constructor(private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    this.isComponentAlive = true;
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.isIBooKView = event.url === PAGE.BOOK_VIEW || event.url === '';
        this.isValidPage =
          event.url === PAGE.BOOK_VIEW || event.url === PAGE.FORM_VIEW;
      });

    this.appService.bookEditMode
      .pipe(takeWhile(() => this.isComponentAlive))
      .subscribe((mode: boolean) => (this.editMode = mode));
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }

  public setEditMode(mode: boolean): void {
    this.appService.bookEditMode.next(mode);
  }
}
