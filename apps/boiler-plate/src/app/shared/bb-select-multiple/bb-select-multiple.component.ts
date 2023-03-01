import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {AnyObject} from './../../core/api/backend-filter';
const DEFAULT_BOX_WIDTH = 432,
  EXTRA_ITEM_WIDTH = 35,
  EXTRA_CONTENT_WIDTH = 75,
  CHAR_WIDTH = 10,
  ITEM_EXTRA_WIDTH = 40,
  VISIBLE_COUNT = 20,
  EXTRA_CHIP_SPACE = 100;
@Component({
  selector: 'boiler-bb-select-multiple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bb-select-multiple.component.html',
  styleUrls: ['./bb-select-multiple.component.css'],
})

/**
 * Component class fot multi select box
 */
export class BbSelectMultipleComponent implements OnInit {
  @Input()
  dataList!: Array<{value: string; label: string}>;

  @Output() selectItemEvent = new EventEmitter<
    Array<{value: string; label: string}>
  >();

  @Input()
  preselectedList!: Array<{value: string; label: string}>;

  @Input()
  boxwidth!: number;

  @Output() selectItemValueEvent = new EventEmitter<Array<string>>();

  listOfOption: Array<{value: string; label: string}> = [];
  originalListOfOption: Array<{value: string; label: string}> = [];
  @Input()
  listOfSelectedValue: Array<string> = [];
  selectedOptions: Array<{value: string; label: string}> = [];
  moreSelectedOptions: Array<{value: string; label: string}> = [];
  moreSelected: Array<string> = [];
  index = 0;
  visibleCount = VISIBLE_COUNT;
  countvisible = false;
  /**
   * Angular ngOnInit
   *
   */
  ngOnInit(): void {
    this.listOfOption =
      this.dataList && this.dataList.length ? [...this.dataList] : [];
    this.originalListOfOption =
      this.listOfOption && this.listOfOption.length
        ? [...this.listOfOption]
        : [];

    if (this.preselectedList && this.preselectedList.length) {
      let preselctArr: Array<string> = [];
      this.preselectedList.forEach(elm => {
        preselctArr.push(elm.value);
      });

      this.listOfSelectedValue =
        preselctArr && preselctArr.length ? preselctArr : [];

      this.selectedOptions =
        this.preselectedList && this.preselectedList.length
          ? this.preselectedList
          : [];
      this.setChipsOnInit();
    }
  }

  /**
   * Function to select option
   * @param chk :
   * @param value
   * @param label
   */
  selectOption(chk: boolean, value: string, label: string): void {
    if (this.selectedOptions.length) {
      let arr = [...this.selectedOptions];
      const selectArr: Array<{value: string; label: string}> = [];
      arr.forEach(elm => {
        if (this.listOfSelectedValue.indexOf(elm.value) !== -1) {
          selectArr.push(elm);
        }
      });
      this.selectedOptions = selectArr;
    }
    if (chk && this.listOfSelectedValue.indexOf(value) === -1) {
      this.setChipsOnSelect(label);

      this.listOfSelectedValue = [
        ...this.listOfSelectedValue,
        value || `New item ${this.index++}`,
      ];

      if (
        this.selectedOptions.some(elm => elm.value !== value) ||
        !this.selectedOptions.length
      ) {
        this.selectedOptions = [...this.selectedOptions, {label, value}];
        this.selectItemValueEvent.emit(this.listOfSelectedValue);
      }
      this.selectItemEvent.emit(this.selectedOptions);
    }
    if (!chk && this.listOfSelectedValue.indexOf(value) !== -1) {
      this.setChipsOnDeSelect(label);
      this.listOfSelectedValue = this.listOfSelectedValue.filter(
        item => item !== value,
      );
      if (this.selectedOptions.some(elm => elm.value === value)) {
        this.selectedOptions = this.selectedOptions.filter(
          item => item.value !== value,
        );
        this.selectItemEvent.emit(this.selectedOptions);
      }
      this.selectItemValueEvent.emit(this.listOfSelectedValue);
    }

    this.moreSelected = [...this.listOfSelectedValue];
    this.moreSelected.splice(0, this.visibleCount);

    this.moreSelectedOptions = [...this.selectedOptions];
    this.moreSelectedOptions.splice(0, this.visibleCount);
  }

  /**
   * Function to set chips as per width on init
   */
  setChipsOnInit(): void {
    //Render chips as per width of the top render-----------------------------
    let contentwidth = 0;
    let remainedwidth = 0;
    let boxwidth = this.boxwidth || DEFAULT_BOX_WIDTH;
    if (!this.countvisible && this.visibleCount != VISIBLE_COUNT)
      this.visibleCount = this.visibleCount + 1;
    contentwidth = Number(contentwidth) + EXTRA_CONTENT_WIDTH;
    let cnt = 0;
    for (let [i] of this.selectedOptions.entries()) {
      remainedwidth = boxwidth - contentwidth;
      let itemnextwidth =
        this.selectedOptions[i]['label'].length * CHAR_WIDTH + ITEM_EXTRA_WIDTH;

      contentwidth = Number(contentwidth) + itemnextwidth;
      if (remainedwidth <= itemnextwidth && !this.countvisible) {
        this.visibleCount = cnt;
        this.countvisible = true;
      }
      cnt++;
    }
    this.moreSelected = [...this.listOfSelectedValue];
    this.moreSelected.splice(0, this.visibleCount);

    this.moreSelectedOptions = [...this.selectedOptions];
    this.moreSelectedOptions.splice(0, this.visibleCount);

    //End Render chips as per width of the top render-----------------------------
  }

  /**
   * Function to set chips as per width on select
   *  @param label
   */
  setChipsOnSelect(label: string): void {
    //Render chips as per width of the top render-----------------------------
    let contentwidth = 0;
    let remainedwidth = 0;
    let boxwidth = this.boxwidth || DEFAULT_BOX_WIDTH;
    if (!this.countvisible && this.visibleCount != VISIBLE_COUNT)
      this.visibleCount = this.visibleCount + 1;
    for (let i = 0; i <= this.listOfSelectedValue.length; i++) {
      let elm = this.listOfSelectedValue[i];
      let itemwidth =
        document.getElementById(elm) &&
        document.getElementById(elm)?.offsetWidth
          ? Number(document.getElementById(elm)?.offsetWidth) + EXTRA_ITEM_WIDTH
          : 0;
      contentwidth = Number(contentwidth) + itemwidth;
    }

    contentwidth = Number(contentwidth) + EXTRA_CONTENT_WIDTH;
    let itemnextwidth = label.length * CHAR_WIDTH + ITEM_EXTRA_WIDTH;
    remainedwidth = boxwidth - contentwidth;

    if (remainedwidth <= itemnextwidth && !this.countvisible) {
      this.visibleCount = this.moreSelected.length
        ? this.listOfSelectedValue.length - this.moreSelected.length
        : this.listOfSelectedValue.length;
      this.countvisible = true;
    }

    //End Render chips as per width of the top render-----------------------------
  }

  /**
   * Function to set chips on de select
   * @param value
   */
  setChipsOnDeSelect(label: string): void {
    // Render chips as per width of the top render-----------------------------
    let boxwidth = this.boxwidth || DEFAULT_BOX_WIDTH;

    let contentwidth = 0;
    let remainedwidth = 0;

    for (let i = 0; i <= this.listOfSelectedValue.length; i++) {
      let elm = this.listOfSelectedValue[i];
      let itemwidth =
        document.getElementById(elm) &&
        document.getElementById(elm)?.offsetWidth
          ? Number(document.getElementById(elm)?.offsetWidth) + EXTRA_ITEM_WIDTH
          : 0;
      contentwidth = Number(contentwidth) + itemwidth;
    }

    contentwidth = Number(contentwidth) + EXTRA_CONTENT_WIDTH;
    let itemnremovewidth = label.length * CHAR_WIDTH + ITEM_EXTRA_WIDTH;
    contentwidth = Number(contentwidth) - Number(itemnremovewidth);
    remainedwidth = boxwidth - contentwidth;

    this.countvisible = false;

    let itemmorewidth = 0;
    if (this.moreSelectedOptions && this.moreSelectedOptions.length) {
      itemmorewidth =
        this.moreSelectedOptions[0]['label'].length * CHAR_WIDTH +
        ITEM_EXTRA_WIDTH;
      if (itemmorewidth >= remainedwidth) {
        this.visibleCount = this.visibleCount - 1;
        this.countvisible = true;
      }
    }

    //End Render chips as per width of the top render-----------------------------
  }

  /**
   * Function to get visible counts
   * @returns visibleCount
   */
  getVisibleCount() {
    return this.visibleCount;
  }

  /**
   * Function to get value and  change selected items list
   * @param value
   */
  selectOptionOnModelChange(changedItems: string[]) {
    //Render chips as per width of the top render-----------------------------
    let boxwidth = this.boxwidth || DEFAULT_BOX_WIDTH;

    this.listOfSelectedValue = changedItems;
    let contentwidth = 0;

    const arrSelect = [...this.selectedOptions];
    const visibleElements = arrSelect.splice(0, this.visibleCount);

    for (let [i] of visibleElements.entries()) {
      if (changedItems.includes(visibleElements[i]['value'])) {
        let itemwidth =
          visibleElements[i]['label'].length * CHAR_WIDTH + ITEM_EXTRA_WIDTH;
        contentwidth = Number(contentwidth) + itemwidth;
      }
    }
    let nextItemIndex = this.selectedOptions.length - visibleElements.length;

    if (
      nextItemIndex > 0 &&
      this.selectedOptions[nextItemIndex]['label'].length * CHAR_WIDTH +
        ITEM_EXTRA_WIDTH >=
        boxwidth - contentwidth
    ) {
      this.visibleCount = this.visibleCount - 1;

      this.countvisible = true;
    }
    //End Render chips as per width of the top render-----------------------------

    this.selectItemValueEvent.emit(this.listOfSelectedValue);
    let arr = [...this.selectedOptions];
    const selectArr: Array<{value: string; label: string}> = [];
    arr.forEach(elm => {
      if (this.listOfSelectedValue.indexOf(elm.value) !== -1) {
        selectArr.push(elm);
      }
    });

    this.selectedOptions = selectArr;
    this.moreSelected = [...this.listOfSelectedValue];
    this.moreSelected.splice(0, this.visibleCount);

    this.moreSelectedOptions = [...this.selectedOptions];

    this.moreSelectedOptions.splice(0, this.visibleCount);
  }
  /**
   * Function to search items in the list
   * @param event
   */
  onSearch(event: AnyObject): void {
    let arr = [...this.originalListOfOption];
    let clearfilterarr = [...this.originalListOfOption];
    if (event?.['target'].value) {
      let searchArr = arr.filter(
        ({value: id1}) =>
          !this.selectedOptions.some(({value: id2}) => id2 === id1),
      );
      let res = searchArr.filter(function f(o) {
        if (
          o.label.toLowerCase().includes(event?.['target'].value.toLowerCase())
        )
          return true;
        return false;
      });
      this.listOfOption = res;
    } else {
      this.listOfOption = clearfilterarr;
    }
  }
}
