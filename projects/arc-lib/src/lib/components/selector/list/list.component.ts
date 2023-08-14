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
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {orderBy} from 'lodash';
import {ITEM_HEIGHT, OptionType, PLACEHOLDER_ITEM} from '../constants';
import {GroupConfig, ItemTemplate} from '../types';

@Component({
  selector: 'arc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<
  InputType,
  MultipleMode extends boolean,
  Value extends InputType[IdField],
  IdField extends keyof InputType,
> implements OnInit, AfterViewInit, OnChanges
{
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
   * Hide these options in list.
   */
  @Input()
  hiddenValues?: Set<Value>;

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

  /**
   * The `disabled` input property is used to determine whether the component should be disabled or not.
   * It has a default value of `false`, which means that the component is enabled by default. If
   * `disabled` is set to `true`, the component will be disabled and the user will not be able to
   * interact with it
   */
  @Input()
  disabled = false;

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
  selections: SelectionModel<Value>;

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
  searchInput: ElementRef;

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  visibleList: InputType[] = [];
  searchControl: UntypedFormControl;
  removed: Set<InputType>;

  @Input()
  showIcon: boolean;

  /* whether to show selected options on top */
  @Input()
  showSelectedOnTop: boolean;

  @Input()
  itemTemplate: TemplateRef<ItemTemplate<InputType, keyof InputType>>;

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
    return item[this.nameField] as unknown as string;
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
    let groupedData: InputType[][] = [[], []];
    if (this.groupConfig?.length) {
      groupedData = this.groupConfig.map(() => []);
      this.visibleList?.forEach(option => {
        const group = this.groupConfig!.findIndex(
          group =>
            (group.value === '*' && option[group.fieldName]) ||
            option[group.fieldName] === group.value,
        );
        if (group !== -1) groupedData[group].push(option);
      });
      this.setGroupIndex(groupedData);
    } else if (this.showSelectedOnTop) {
      groupedData = this._sortSelectedOptions(groupedData);
    } else {
      //intentional
    }

    if (groupedData[0].length || groupedData[1].length) {
      this.visibleList = groupedData.flat();
    }
  }
  setGroupIndex(groupedData: InputType[][]) {
    if (this.groupConfig)
      this.groupIndexMap = this.groupConfig.reduce(
        (acc, obj, index) =>
          obj.groupName ? {...acc, [index]: obj.groupName} : acc,
        {},
      );

    let dataLength = 0;
    groupedData.forEach(data => {
      if (data.length > 0) {
        dataLength = dataLength + 1;
      }
    });
    if (dataLength <= 1) {
      this.groupIndexMap = {};
    }
  }

  private _sortSelectedOptions(groupedData: InputType[][]) {
    this.visibleList?.forEach(option => {
      if (option['isSelected' as keyof InputType]) {
        groupedData[OptionType.Selected].push(option);
      } else {
        groupedData[OptionType.UnSelected].push(option);
      }
    });

    groupedData.forEach((data, index) => {
      groupedData[index] = orderBy(
        data,
        [
          option =>
            (
              option['name' as keyof InputType] as unknown as string
            ).toLocaleLowerCase(),
        ],
        'asc',
      );
    });
    return groupedData;
  }
}
