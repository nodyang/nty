import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injectable,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import {from, fromEvent, Observable, of, throwError} from 'rxjs';
import jsonpG from 'jsonp-good';
import {catchError, debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';

interface BaiduRes {
  q: string;
}

@Injectable({
  providedIn: 'root',
})
class  BaiduService{
  readonly url = 'https://www.baidu.com/sugrec';
  list(wd: string): Observable<BaiduRes[]>{
    return from(jsonpG({
       url: this.url,
      funcName: 'jQuery110203052522071732855_1604236886158',
      params: {
        prod: 'pc',
        from: 'pc_web',
        wd
      }
    }).then((res: {g: BaiduRes[]}) => res.g));
  }
}

@Component({
  selector: 'app-rxjs-demo',
  template: `
    <div class="container">
      <div class="autocomplete mt-2">
        <input #input class="form-control" placeholder="search..." />
        <ul class="list-group mt-2">
          <li class="list-group-item" *ngFor="let item of resList">{{item?.q}}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
  ],

  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RxjsDemoComponent implements OnInit, AfterViewInit  {

  @ViewChild('input', {static: true}) private inputEl: ElementRef | undefined;
  resList: BaiduRes[] | undefined;
  constructor(private baiduServer: BaiduService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputEl?.nativeElement, 'input').pipe(
      debounceTime(500),
      pluck('target', 'value'),
      distinctUntilChanged<string>(),
      switchMap((value: string) => value.length ? this.baiduServer.list(value) : of([])),
      catchError(err => throwError(err))
    ).subscribe(res => {
           this.resList = res;
           this.cdr.markForCheck();
    }, error => {
       console.error(error);
    });
  }

}
