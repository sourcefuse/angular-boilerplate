import { SelectionModel } from '@angular/cdk/collections';
import {
  ConnectedPosition,
  Overlay,
  ViewportRuler,
} from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBaseDirective } from '@boiler/core/component-base';
import { DIGITS } from '@boiler/core/constants';

import { NbTagComponent } from '@nebular/theme';
import { cloneDeep, isEqual } from 'lodash';
import { takeUntil } from 'rxjs';
import { dropdownAnimation, rotateAnimation } from '../animations';
import {
  INPUT_MIN_WIDTH,
  ITEM_HEIGHT,
  MIN_VISIBLE_ITEMS,
  panelConfigs,
  PanelType,
  PLACEHOLDER_ITEM,
  SEARCH_HEIGHT,
  SelectState,
  SUFFIX_WIDTH,
  TAG_MARGIN,
  TAG_PADDING,
} from '../constants';
import { GroupConfig, Panel, ValueType } from '../types';
@Component({
  selector: 'select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [dropdownAnimation, rotateAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<
    InputType,
    MultipleMode extends boolean,
    Value extends InputType[IdField],
    IdField extends keyof InputType
  >
  extends ComponentBaseDirective
  implements ControlValueAccessor, OnInit, OnChanges
{
  constructor(
    public overlay: Overlay,
    public elementRef: ElementRef,
    protected _viewportRuler: ViewportRuler,
    private _cdr: ChangeDetectorRef
  ) {
    super();
    this.panels = cloneDeep(panelConfigs);
  }

  @ViewChildren(NbTagComponent)
  tags!: QueryList<NbTagComponent>;

  @ViewChild('autoCompleteInput')
  autoCompleteInput?: ElementRef<HTMLInputElement>;

  selections: SelectionModel<Value> = new SelectionModel();
  selectedItems: SelectionModel<InputType> = new SelectionModel();
  visibleTags: InputType[] = [];
  isEmpty = true;

  /* Defining config for both kinds of panels */
  panels: Record<PanelType, Panel<InputType>>;
  currentPanel?: Panel<InputType>;
  currentPanelType?: PanelType;

  /* A type alias for states and panel type enum */
  states = SelectState;
  types = PanelType;
  /* Setting the state of the dropdown to closed. */
  state: SelectState = SelectState.Closed;

  /* Setting the position of the dropdown. */
  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 5,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      panelClass: 'bizbook-select-panel-above',
    },
  ];

  // dropdown overlay width, this is set based on width of container
  width = 0;

  /* css dependent values, these are supposed to be changed whenever css is changed */
  /* the padding of the tags container. */
  padding = TAG_PADDING;
  /* The margin between tags. */
  tagMargin = TAG_MARGIN;
  /* The height of each item in the dropdown. */
  itemHeight = ITEM_HEIGHT;
  /* The width of the cross, plus and chevron icons. */
  suffixWidth = SUFFIX_WIDTH;
  /* The height of the input box */
  searchHeight = SEARCH_HEIGHT;

  /* calculated values based on above values */
  /* A variable that is used to set the height of the dropdown. */
  dropdownHeight!: number;
  /* this could 1,2 or 3, based on the whether the cross, plus and chevrons */
  suffixCount = 0;

  /**
   * The field in the data item that uniquely identifies it.
   */
  @Input()
  idField: IdField = 'id' as IdField;

  /**
   * showIcon allows user to show initial of the option as an icon
   */
  @Input()
  showIcon = false;
  /**
   * The name of the field in the generic type T that contains the name of the
   * item to display. This is used to read the name of each item in the list.
   */
  @Input()
  nameField: keyof InputType = 'name' as keyof InputType;

  /**
   * The field to show disabled items in the list
   */
  @Input()
  disabledField: keyof InputType = 'deleted' as keyof InputType;

  /**
   * The text to be displayed in the input box when no value is entered.
   */
  @Input()
  placeholder = '';

  // Sets the minimum width for the input box, in pixels.
  // Used to prevent the input box from shrinking when the container is very small.
  @Input()
  inputMinWidth = INPUT_MIN_WIDTH;

  // This code sets the multiple mode for the Select component.
  @Input()
  multiple: MultipleMode = false as MultipleMode;

  /**
   * The options that will be displayed in the select.
   */
  @Input()
  options?: InputType[];

  @Input()
  showClearAll = true;

  /**
   * Whether to show the search box.
   */
  @Input()
  search = true;

  // disable the dropdown
  @Input()
  disabled = false;

  /**
   * Indicates whether custom the input is allowed.
   */
  @Input()
  allowInput = false;

  /* Max number of items visible at a time in the dropdown, used to set the height */
  @Input()
  maxVisibleItems = MIN_VISIBLE_ITEMS;

  /* label to show to add a custom item in the dropdown */
  @Input()
  addTagString = 'createANewTag';

  /* Placeholder for the search input */
  @Input()
  searchPlaceholder = 'search';

  /* Used to get groupConfig from components to group data if needed */
  @Input()
  groupConfig: GroupConfig<InputType>[] = [];
  /**
   * Whether to select the first option when the user presses enter
   */
  @Input()
  selectOnEnter = true;

  @Output()
  newAdded = new EventEmitter<InputType>();

  @Output()
  newRemoved = new EventEmitter<InputType>();

  @Output()
  added = new EventEmitter<InputType>();

  @Output()
  removed = new EventEmitter<InputType>();

  @Output()
  cleared = new EventEmitter<void>();

  @Output()
  valueChange = new EventEmitter<ValueType<MultipleMode, Value>>();

  /* Control value accessor related properties */
  onChange = (value: ValueType<MultipleMode, Value>) => {};

  onTouched = () => {};

  registerOnChange(onChange: (value: ValueType<MultipleMode, Value>) => {}) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => {}) {
    this.onTouched = onTouched;
  }

  writeValue(value: ValueType<MultipleMode, Value>) {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /**
   * The function sets the value of the selection model to the value passed in
   * @param value - ValueType<MultipleMode, Value>
   */
  @Input()
  set value(value: ValueType<MultipleMode, Value>) {
    this._initSelectionModel();
    this._setSelections(value);
    this.onChange(value);
    this.onTouched();
    this.updateTagsCount();
  }

  /**
   * If the `multiple` property is true, return the `selected` property of the `selections` object as an
   * array. Otherwise, return the first element of the `selected` property of the `selections` object as
   * a single value
   * @returns The value of the selected item.
   */
  get value(): ValueType<MultipleMode, Value> {
    if (this.multiple === true) {
      return this.selections.selected as ValueType<MultipleMode, Value>;
    } else {
      return this.selections.selected[0] as ValueType<MultipleMode, Value>;
    }
  }

  /**
   * It returns the list of invisible tags to be shown in tags panel
   * @returns The list of invisible tags.
   */
  get invisibleTags() {
    return this.panels[PanelType.Extra].list;
  }

  /**
   * It sets the value of the invisibleTags property to the value of the value parameter.
   * @param {InputType[]} value - The value of the input.
   */
  set invisibleTags(value: InputType[]) {
    this.panels[PanelType.Extra].list = Object.assign([], value);
  }

  ngOnInit(): void {
    this._initSelectionModel();
    /* Subscribing to the viewportRuler's change event and updating the width of the element. */
    this._viewportRuler
      .change()
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._updateWidth();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['multiple'] && !changes['multiple'].isFirstChange()) {
      this._initSelectionModel();
    }
    this._dropdownHeight();
    this.updateSelectedItems();
    this.updateTagsCount();
  }

  /**
   * If the item is not a placeholder, toggle the item in the selections array. If the item is a
   * placeholder, and it is not selected, emit the item as a newRemoved event
   * @param {InputType} item - InputType - the item that was selected/deselected
   */
  toggle(item: InputType) {
    this.selectedItems.toggle(item);
    if (!this.isPlaceholder(item)) {
      this.selections.toggle(item[this.idField] as Value);
      if (this.selections.isSelected(item[this.idField] as Value)) {
        this.added.emit(item);
      } else {
        this.removed.emit(item);
      }
    } else if (!this.selectedItems.isSelected(item)) {
      this.newRemoved.emit(item);
    } else {
      this.newAdded.emit(item);
    }
    this._processChange();
  }

  /**
   * It clears the selections and selectedItems collections, then emits the cleared event
   */
  clearAll() {
    this.selections.clear();
    this.selectedItems.clear();
    this._processChange();
    this.cleared.emit();
  }

  /**
   * If the state is closed, open the dropdown, otherwise close it
   */
  toggleDropdown() {
    if (this.state === SelectState.Closed) {
      this.open();
    } else {
      this.close();
    }
    this._cdr.detectChanges();
  }

  /**
   * If the panel is closed, open it, otherwise close it
   */
  togglePanel(type: PanelType) {
    if (this.panels[type].state === SelectState.Closed) {
      this.openPanel(type);
    } else {
      this.closePanel();
    }
  }

  openPanel(type: PanelType) {
    this.panels[type].state = SelectState.Open;
    this.currentPanel = this.panels[type];
    this.currentPanelType = type;
    this._panelWidth(type);
    this._panelHeight(type, this.panels[type].list);
    this._cdr.detectChanges();
  }

  /**
   * If there is a current panel, set its state to closed and clear the current panel and panel type
   */
  closePanel() {
    if (this.currentPanel) {
      this.currentPanel.state = SelectState.Closed;
      this.currentPanel = undefined;
      this.currentPanelType = undefined;
    }
  }

  /**
   * It filters the autocomplete options based on the value of the input, and adds a placeholder option
   * if the value is not found in the data
   * @param {string} value - string - the value of the input field
   */
  updateAutocompleteOptions(value: string) {
    let showAddOption = !this.selectedItems.selected.some((item) =>
      isEqual(item[this.nameField], value)
    );
    this.panels[PanelType.Autocomplete].list = [];
    if (value) {
      this.panels[PanelType.Autocomplete].list =
        this.options?.filter((item) => {
          if (this.asString(item[this.nameField]) === value) {
            showAddOption = false;
          }
          return (
            !this.selections.isSelected(item[this.idField] as Value) &&
            this.asString(item[this.nameField])
              .toLowerCase()
              .trim()
              .indexOf(value.toLowerCase().trim()) > -1
          );
        }) ?? [];
    }
    if (showAddOption && value.length) {
      this.panels[PanelType.Autocomplete].list.push({
        [this.idField]: PLACEHOLDER_ITEM,
        [this.nameField]: value,
      } as unknown as InputType);
    }
    if (this.panels[PanelType.Autocomplete].list.length) {
      this.openPanel(PanelType.Autocomplete);
    } else {
      this.closePanel();
    }
    this._cdr.detectChanges();
  }

  /**
   * If the user presses enter, clear the input and if there's an autocomplete suggestion, select it
   * @param {HTMLInputElement} input - HTMLInputElement - the input element that the user is typing in
   */
  autocompleteEnter(input: HTMLInputElement) {
    input.value = '';
    if (this.panels[PanelType.Autocomplete].list[0]) {
      this.handleAutocompleteSelect(
        this.panels[PanelType.Autocomplete].list[0]
      );
      this.closePanel();
    }
  }

  /**
   * If the item is a placeholder, then select it and emit the newAdded event. Otherwise, toggle the item
   * @param {InputType} item - InputType - this is the item that was selected from the autocomplete
   * dropdown.
   */
  handleAutocompleteSelect(item: InputType) {
    if (this.isPlaceholder(item)) {
      this.selectedItems.select(item);
      this.newAdded.emit(item);
    } else {
      this.toggle(item);
    }
    this.panels[PanelType.Autocomplete].list = [];
    if (this.autoCompleteInput) {
      this.autoCompleteInput.nativeElement.value = '';
    }
    this._processChange();
  }

  /**
   * The funtion closes the dropdown, change detection is triggered internally by the update width method
   */
  open() {
    this.state = SelectState.Open;
    this._updateWidth();
  }

  /**
   * The function closes the dropdown and tells Angular to check for changes
   */
  close() {
    this.state = SelectState.Closed;
    this._cdr.detectChanges();
  }

  /**
   * It emits the new value of the select box
   */
  emitNewValue() {
    if (this.multiple === true) {
      this.valueChange.emit(
        this.selections.selected as ValueType<MultipleMode, Value>
      );
    } else {
      this.valueChange.emit(
        this.selections.selected[0] as ValueType<MultipleMode, Value>
      );
    }
  }

  /**
   * It calculates the width of the tags and the input box and then decides which tags to show and which
   * to hide
   */
  updateTagsCount() {
    // for cross and chevron if not disabled
    this.suffixCount = this.disabled ? 0 : DIGITS.TWO;
    if (this.invisibleTags.length) {
      // for the counter box
      this.suffixCount += 1;
    }
    this.invisibleTags = [];
    this.visibleTags = Object.assign([], this.selectedItems.selected);
    this._cdr.detectChanges();
    const inputBuffer =
      this.allowInput && !this.disabled
        ? this.inputMinWidth + DIGITS.TWO * this.tagMargin
        : 0;
    const width = this.elementRef.nativeElement.getBoundingClientRect().width;
    const rightPadding = this.suffixWidth * this.suffixCount;
    const allowedWidth =
      width - (this.padding * DIGITS.TWO + rightPadding + inputBuffer);
    let combinedWidth = 0;
    let i;
    for (i = 0; i < this.tags.length; i++) {
      const tag = this.tags.get(i);
      if (!tag) {
        break;
      }
      combinedWidth =
        combinedWidth +
        tag._hostElement.nativeElement.getBoundingClientRect().width +
        DIGITS.TWO * this.tagMargin;
      if (combinedWidth > allowedWidth) {
        break;
      }
    }
    if (i === 0) {
      i = 1;
    }
    this.visibleTags = this.selectedItems.selected.slice(0, i);
    this.invisibleTags = this.selectedItems.selected.slice(i);
    // this required again to ensure proper width of input element
    if (this.invisibleTags.length) {
      // for the counter box
      this.suffixCount += 1;
    }
    this._cdr.detectChanges();
  }

  /**
   * It takes an item of type T and returns it as a string
   * @param {T} item - T - The item to be converted to a string.
   * @returns The item as a string.
   */
  asString<T>(item: T) {
    return item as unknown as string;
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
   * A function that is called when the selection changes.
   */
  private _processChange() {
    this._updateEmptyState();
    this.emitNewValue();
    this.onChange(this.value);
    // this triggers the detect changes
    this.updateTagsCount();
    // this can only be called after tags have been updated
    if (this.currentPanel && this.currentPanelType) {
      this._panelHeight(this.currentPanelType, this.currentPanel.list);
    }
  }

  /**
   * `this._setSelections` is a private function that updates the value of the selections
   * @param value - ValueType<MultipleMode, Value>
   */
  private _setSelections(value: ValueType<MultipleMode, Value>) {
    if (this.multiple && Array.isArray(value)) {
      this.selections.select(...(value as Value[]));
    } else if (!this.multiple) {
      this.selections.select(value as Value);
    } else {
      this.selections.clear();
    }
    this.updateSelectedItems();
  }

  /**
   * If the selectedItems.selected array is empty, then set the isEmpty variable to true. Otherwise, set
   * it to false
   */
  private _updateEmptyState() {
    if (this.selectedItems.selected.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  /**
   * It updates the selectedItems with the selected items
   */
  private updateSelectedItems() {
    this.selectedItems.clear();
    const ids = this.selections.selected;
    if (this.multiple) {
      const items = this.options?.filter((item) =>
        ids.includes(item[this.idField] as Value)
      );
      if (items?.length) {
        this.selectedItems.select(...items);
      }
    } else {
      const item = this.options?.find(
        (item) => item[this.idField] === ids[0]
      ) as InputType;
      if (item) {
        this.selectedItems.select(item);
      }
    }
    this._updateEmptyState();
  }

  /**
   * > Initialize the selection models based on the `multiple` property
   */
  private _initSelectionModel() {
    this.selections = new SelectionModel(this.multiple);
    this.selectedItems = new SelectionModel(this.multiple);
  }

  /**
   * It updates the width of the dropdown overlay element.
   */
  private _updateWidth() {
    this.width = this.elementRef.nativeElement.getBoundingClientRect().width;
    this._cdr.detectChanges();
  }

  /**
   * It updates the width of the panel overlay element.
   */
  private _panelWidth(type: PanelType) {
    this.panels[type].width =
      this.elementRef.nativeElement.getBoundingClientRect().width;
    this._cdr.detectChanges();
  }

  /**
   * It sets the height of the `panel` div to the height of the number of items in the `invisibleTags`
   * array, or the `maxVisibleItems` property, whichever is smaller
   */
  private _panelHeight(type: PanelType, list: InputType[]) {
    this.panels[type].height =
      list.length > this.maxVisibleItems
        ? this.itemHeight * this.maxVisibleItems
        : this.itemHeight * list.length;
    this._cdr.detectChanges();
  }

  /**
   * _dropdownHeight() is a private function that calculates the panelHeight property based on the number
   * of items in the data array and the `maxVisibleItems` property.
   * If the `search` property is true, then it adds the `searchHeight` property to the panelHeight.
   */
  private _dropdownHeight() {
    const minSize = this.options?.length || 1;
    this.dropdownHeight =
      minSize > this.maxVisibleItems
        ? this.itemHeight * this.maxVisibleItems
        : this.itemHeight * minSize;
    if (this.search) {
      this.dropdownHeight += this.searchHeight + 1;
    }
  }
}
