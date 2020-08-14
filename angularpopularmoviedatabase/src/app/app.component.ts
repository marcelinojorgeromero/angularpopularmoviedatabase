import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { TmdbStoreService } from './tmdb-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Movie Viewer';
  mediaSub: Subscription;
  isDeviceXs: boolean;

  constructor(public mediaObserver: MediaObserver, public tmdbStoreService: TmdbStoreService) {}

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$
    .subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      this.isDeviceXs = result.mqAlias === 'xs';
    });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  performSearch(queryEvent: any): void {
    this.tmdbStoreService.searchMovie(queryEvent);
  }
}
