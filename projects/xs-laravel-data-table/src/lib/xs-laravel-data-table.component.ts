import {
  AfterViewInit,
  Component,
  ContentChild, ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output, QueryList,
  SimpleChanges,
  TemplateRef, ViewChild,
  ViewRef
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, finalize, map, switchMap} from 'rxjs/operators';
import {ILaravelResponse} from '../interfaces/ILaravelResponse';
import {ILaravelDataTableConfig} from '../interfaces/ILaravelDataTableConfig';
import t from 'typy';
import {RowTplDirective} from '../directives/row-tpl.directive';
import {LtCellTemplateDirective} from '../directives/lt-cell-template.directive';
import *  as lo from 'lodash';
import {Paginator} from 'primeng/paginator';
import {IApiService} from '../interfaces/IApiService';

@Component({
  selector: 'xs-laravel-data-table',
  templateUrl: 'xs-laravel-data-table.html',
  styleUrls: ['./xs-laravel-data-table.scss']

})
export class XsLaravelDataTableComponent implements AfterViewInit, OnChanges {
  @ContentChild(RowTplDirective, {static: true}) rowTemplate: RowTplDirective;
  @ContentChildren(LtCellTemplateDirective, {descendants: true}) cellTemplates: QueryList<LtCellTemplateDirective>;
  @ViewChild('paginator') paginator: Paginator;
  public firstLoad = true;
  public t = t;
  public trashed = false;
  @Input() api: IApiService;
  @Input() endpoint;
  @Input() data: ILaravelResponse;
  @Input() labels = [];
  @Input() config: ILaravelDataTableConfig;
  @Output() sortUpdated = new EventEmitter();
  @Input() rowTpl: TemplateRef<any>;
  @Output() instance = new EventEmitter();
  public params = {
    per_page: 15,
    trashed: false,
    page: 1,
    search: {},
    sort: {
      key: '',
      order: 'DESC'
    }
  };
  public perPageList = [
    1, 15, 50, 100, 200
  ];
  public observable$;
  public keyUp = new Subject();
  public loading = false;
  public updatingRows = [];
  public cellTemplateRefs = {};
  public dataSub$: Subscription;
  public dataLoading = false;

  constructor() {

  }

  ngAfterViewInit(): void {

    this.observable$ = this.api.post(this.endpoint, this.params);
    this.initTable();
    this.instance.emit(this);
    const tpls = [];
    lo.forEach(this.cellTemplates.toArray(), (tpl: LtCellTemplateDirective) => {
      this.cellTemplateRefs[tpl.field] = tpl.tpl;
    });

  }

  public emptyObject(o) {
    if (o instanceof Object) {
      const v = (Object.keys(0).length === 0);

    }
    return false;
  }

  public initTable() {

    this.keyUp.pipe(
      map((e: KeyboardEvent) => {
        return (e.target as HTMLInputElement).value;
      }),
      debounceTime(400),
      switchMap(e => {
        this.showLoader();
        // this.removeEmpty(this.params.search);
        return this.observable$.pipe(finalize(() => this.hideLoader()));
      }),
    ).subscribe(res => {
      this.setupData(res);
    }, err => {
      console.log(err);
    });

  }

  removeEmpty(obj, removeAll = false) {
    Object.keys(obj).forEach(key => {
      console.log(obj[key]);
      if (obj[key] && typeof obj[key] === 'object') {
        this.removeEmpty(obj[key]);
      } else if (((obj[key] == null) || ('' + obj[key]).trim() === '') || removeAll) {
        delete obj[key];
      } // delete
    });
  }

  haveItems(obj) {
    if (obj) {
      return Object.keys(obj).length > 0;
    }
    return false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  setupData(res) {
    this.data = res;
  }

  updateEndpoint(url) {
    //  this.endpoint = url;
    //  this.initTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.endpoint) {
      this.observable$ = this.api.post(this.endpoint, this.params);
      this.loadData();
    }
  }

  removeColumn(nameOrIndex, total = 1) {
    if (Number.isInteger(nameOrIndex)) {
      this.config.fields.splice(nameOrIndex, total);
    } else {
      for (let f of this.config.fields) {
        //console.log(f);
      }
    }
  }

  loadData() {
    if (this.dataSub$) {
      this.dataSub$.unsubscribe();
    }
    this.dataLoading = true;
    this.dataSub$ = this.observable$.pipe(
      finalize(() => {
        this.dataLoading = false;
        //  console.log('loaded');
      })
    ).subscribe(res => {
      this.data = null;
      this.data = res;
      this.firstLoad = false;
    });

  }

  pushItem(item) {
    this.data.data.unshift(item);
  }

  perPageChanged(count: number) {
    this.params.per_page = count;
    this.loadData();
  }

  ku($event) {
    this.keyUp.next($event);
  }

  sort(key, sortable) {
    if (sortable === false) {
      return;
    }
    const order = this.params.sort.order === 'desc' ? 'asc' : 'desc';
    this.params.sort = {key, order};
    this.loadData();
  }

  pageChange($event) {
    this.params.page = $event;
    //this.loadData();
  }

  clearSearch() {
    this.removeEmpty(this.params.search, true);
    this.loadData();
  }

  clearSort() {
    this.params.sort.key = null;
    this.loadData();

  }

  saveOrder(item: any, idx) {
    const ep = this.endpoint.replace('list', 'save');
    this.updatingRows.push(idx);
    this.api.post(ep, {id: item.id, sort_order: item.sort_order})
      .pipe(finalize(() => {
        this.updatingRows.splice(this.updatingRows.indexOf(idx), 1);
      }))
      .subscribe(res => {

      });
  }

  checkIfViewRef(variable) {
    return variable instanceof TemplateRef;
  }

  setActions(actions) {
    this.config.actions = actions;
  }

  showAll() {
    this.params.trashed = false;
    this.loadData();
  }

  showTrashed() {
    this.params.trashed = true;
    this.loadData();
  }

  removeItemAtIndex(idx) {
    this.data.data.splice(idx, 1);
    this.data.data = [].concat(this.data.data);
  }

  pageChanged($event: any) {
    // if ($event.page + 1 === this.params.page) return;
    this.params.page = $event.page + 1;
    this.params.per_page = $event.rows;
    this.loadData();
  }
}
