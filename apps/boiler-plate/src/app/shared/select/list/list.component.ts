import {SelectionModel} from '@angular/cdk/collections';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {ITEM_HEIGHT, PLACEHOLDER_ITEM} from '../constants';
import {GroupConfig} from '../types';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<
  InputType,
  MultipleMode extends boolean,
  Value extends InputType[IdField],
  IdField extends keyof InputType
> implements OnInit, AfterViewInit, OnChanges {
  constructor(private _cdr: ChangeDetectorRef) {}
  /**
   * The list of items to display.
   */
  @Input()
  options?: InputType[] = [];

  /**
   * The name of the field in the generic type T that contains the name of the
   * item to display. This is used to read the name of each item in the list.
   */
  @Input()
  nameField: keyof InputType = 'name' as keyof InputType;

  /**
   * The field in the data item that uniquely identifies it.
   */
  @Input()
  idField: IdField = 'id' as IdField;

  /**
   * The field to show disabled items in the list
   */
  @Input()
  disabledField: keyof InputType = 'deleted' as keyof InputType;

  /* height of the each items in the list. */
  @Input()
  itemHeight = ITEM_HEIGHT;

  /* A boolean that is used to determine if the user can select multiple items in the list. */
  @Input()
  multiple: MultipleMode = false as MultipleMode;

  /**
   * Whether to show the search box.
   */
  @Input()
  search = true;

  /**
   * The removal input is a boolean value that determines whether or not the
   * component should be rendered in removal mode
   */
  @Input()
  removal = false;

  /* Placeholder for the search input */
  @Input()
  searchPlaceholder = 'search';

  /**
   * This is the search result text to be displayed when no search result is found.
   */
  @Input()
  noSearchResultText = 'noResultLbl';

  /**
   * The text to display when no data is available
   */
  @Input()
  noDataText = 'noDataLbl';

  /* label to show to add a custom item in the dropdown */
  @Input()
  addTagString = 'createANewTag';

  /* When the user presses enter while searching, the first item visible is selected */
  @Input()
  selectOnEnter = true;

  /**
   * Indicates whether custom the input is allowed.
   */
  @Input()
  allowInput = false;

  @Input()
  selections!: SelectionModel<Value>;

  /**
   * @description
   * Emits a value of true when the user clicks the close button.
   */
  @Output()
  closed = new EventEmitter<boolean>();

  /**
   * Emits the selected value when the user toggles an option.
   * @param value The value of the option that the user toggled.
   */
  @Output()
  toggle = new EventEmitter<InputType>();

  /* Emits an event when an item is removed */
  @Output()
  remove = new EventEmitter<InputType>();

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  visibleList: InputType[] = [];
  searchControl!: UntypedFormControl;
  removed!: Set<InputType>;

  @Input()
  showIcon!: boolean;

  @Input()
  groupConfig?: GroupConfig<InputType>[] = [];
  groupIndexMap: Record<number, string> = {};
  /**
   * It initializes the removed set, the visible list, and the search control
   */
  ngOnInit(): void {
    this.removed = new Set();
    this.visibleList = Object.assign([], this.options);
    this.sortByGroups();
    this.searchControl = new UntypedFormControl();
    this.searchControl.valueChanges.subscribe(value => {
      this.visibleList =
        this.options?.filter(
          item =>
            !value ||
            this.getName(item).toLowerCase().includes(value.toLowerCase()),
        ) ?? [];
      this.sortByGroups();
    });
  }

  /**
   * After the view is initialized, if the searchInput exists, focus on it.
   */
  ngAfterViewInit(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
      this._cdr.detectChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.visibleList = Object.assign([], this.options);
    }
  }

  /**
   * The function takes an item of type T, and emits an event with the item as the payload
   * @param {InputType} item - InputType - the item that was clicked
   */
  toggleItem(item: InputType) {
    this.toggle.emit(item);
    if (this.allowInput) {
      this.closed.emit();
    }
  }

  /**
   * Get the name of the item by getting the value of the name field of the item.
   * @param {InputType} item - InputType - the item that we're getting the name of
   * @returns The name of the item.
   */
  getName(item: InputType) {
    return (item[this.nameField] as unknown) as string;
  }

  /**
   * It removes an item from the list, emits an event, and then checks if the list is empty
   * @param {InputType} item - InputType - the item to be removed from the list
   */
  removeItem(item: InputType) {
    this.removed.add(item);
    this.remove.emit(item);
    this.visibleList =
      this.options?.filter(item => !this.removed.has(item)) ?? [];
    if (this.visibleList.length) {
      this.viewport?.checkViewportSize();
    } else {
      this.closed.emit(true);
    }
  }

  /**
   * If the id of the item is a string and it's equal to the placeholder item, then return true.
   * Otherwise, return false
   * @param {InputType} item - InputType - the item to check
   * @returns A boolean value.
   */
  isPlaceholder(item: InputType) {
    const id = item[this.idField];
    if (typeof id === 'string' && id === PLACEHOLDER_ITEM) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * If the user presses enter on the search box, and there are items in the list, select the first item
   * in the list
   */
  enterOnSearch() {
    if (!this.removal && this.visibleList.length) {
      this.toggleItem(this.visibleList[0]);
    }
  }

  sortByGroups() {
    if (this.groupConfig && this.groupConfig.length) {
      let groupedData: InputType[][] = this.groupConfig.map(() => []);
      this.visibleList?.forEach(option => {
        const group = this.groupConfig!.findIndex(
          group =>
            (group.value === '*' && option[group.fieldName]) ||
            option[group.fieldName] === group.value,
        );
        if (group !== -1) groupedData[group].push(option);
      });
      this.groupIndexMap = this.groupConfig.reduce(
        (acc, obj, index) =>
          obj.groupName ? {...acc, [index]: obj.groupName} : acc,
        {},
      );
      this.visibleList = groupedData.flat();
    }
  }
}
