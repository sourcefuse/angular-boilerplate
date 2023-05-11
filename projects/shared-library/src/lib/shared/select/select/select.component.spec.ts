import { trigger } from '@angular/animations';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { DIGITS } from '@boiler/core/constants';
import { ThemeModule } from '@boiler/theme/theme.module';
import { TranslateService } from '@ngx-translate/core';
import { finishVirtualScrollInit } from 'src/testing/virtual-scroll-init';
import { AngularTranslationServiceStub } from '../../../../testing/translation-service-stub';
import { SelectModule } from '../select.module';
import { SelectTestComponent } from '../tests/select-test.component';
import { SelectTestModule } from '../tests/select-test.module';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  const items = [
    {
      id: '1',
      name: 'Item 1',
    },
    {
      id: '2',
      name: 'Item 2',
    },
    {
      id: '3',
      name: 'Item 3',
    },
  ];
  let debugElement: DebugElement;
  let component: SelectTestComponent;
  let fixture: ComponentFixture<SelectTestComponent>;
  const selectContainer = '.select-container';
  const listItem = '.select-panel .list .item';
  const listPanel = '.select-panel .list';
  const searchBar = '.select-panel .search-input';
  const valueInput = '.select-container input[type=text]';
  describe('Single selection', () => {
    beforeEach(async () => {
      await setupComponent();
      component.multiple = false;
      component.options = items;
      fixture.detectChanges();
      await fixture.isStable();
    });
    it('should show a list of values without checkbox and search on click on field', fakeAsync(async () => {
      const field = debugElement.query(By.css(selectContainer));
      field.nativeElement.click();
      fixture.detectChanges();
      finishVirtualScrollInit(fixture);
      const list = debugElement.queryAll(By.css(listItem));
      expect(list).toHaveSize(DIGITS.THREE);
      const checkbox = debugElement.query(
        By.css('.select-panel .list .item nb-checkbox')
      );
      expect(checkbox).toBeNull();
      const search = debugElement.query(By.css(searchBar));
      expect(search).toBeNull();
    }));

    it('should close panel on clicking on field again', fakeAsync(() => {
      const field = debugElement.query(By.css(selectContainer));
      field.nativeElement.click();
      fixture.detectChanges();
      finishVirtualScrollInit(fixture);
      const list = debugElement.queryAll(By.css(listItem));
      expect(list).toHaveSize(DIGITS.THREE);
      field.nativeElement.click();
      fixture.detectChanges();
      flush();
      const panel = debugElement.query(By.css(listPanel));
      expect(panel).toBeNull();
    }));

    it('should select a value and close panel on click of item', fakeAsync(async () => {
      clickOnPanel();
      clickOnItem(1);
      expect(component.control.value).toEqual(items[1].id);
      const panel = debugElement.query(By.css(listPanel));
      expect(panel).toBeNull();
    }));

    it('should have a value selected and cleared through abstract control', fakeAsync(async () => {
      component.control.setValue(items[1].id);
      fixture.detectChanges();
      const input = debugElement.query(By.css(valueInput));
      expect(input.nativeElement.value).toEqual(items[1].name);
      component.control.reset();
      fixture.detectChanges();
      expect(input.nativeElement.value).toEqual('');
    }));

    it('should clear value on clicking on a selected item', fakeAsync(async () => {
      component.control.setValue(items[1].id);
      fixture.detectChanges();
      const input = debugElement.query(By.css(valueInput));
      expect(input.nativeElement.value).toEqual(items[1].name);

      clickOnPanel();
      const list = debugElement.queryAll(By.css(listItem));
      expect(list).toHaveSize(DIGITS.THREE);
      clickOnItem(1);
      expect(component.control.value).toEqual(undefined);
    }));

    it('should show search bar and focus it when search option is true', fakeAsync(async () => {
      component.search = true;
      fixture.detectChanges();
      clickOnPanel();
      const search = debugElement.query(By.css(searchBar));
      expect(search).toBeTruthy();
      expect(
        document.activeElement?.classList.contains('search-input')
      ).toBeTrue();
    }));

    it('should clear value on cross click', fakeAsync(async () => {
      component.control.setValue(items[1].id);
      fixture.detectChanges();
      const input = debugElement.query(By.css(valueInput));
      expect(input.nativeElement.value).toEqual(items[1].name);

      const cross = debugElement.query(By.css('.select-container .close-icon'));
      cross.nativeElement.click();
      fixture.detectChanges();
      expect(component.control.value).toEqual(undefined);
    }));

    it('should filter options when search value is entered', fakeAsync(async () => {
      component.search = true;
      fixture.detectChanges();
      clickOnPanel();
      const search = debugElement.query(By.css(searchBar));
      search.nativeElement.value = 'Item 2';
      search.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const list = debugElement.queryAll(By.css(listItem));
      expect(list).toHaveSize(1);
      expect(list[0].nativeElement.textContent).toEqual('Item 2');
    }));

    it('should select first item on clicking enter after search', fakeAsync(async () => {
      component.search = true;
      fixture.detectChanges();
      clickOnPanel();
      const search = debugElement.query(By.css(searchBar));
      search.nativeElement.value = 'Item 2';
      search.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      search.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', {
          key: 'Enter',
        })
      );
      fixture.detectChanges();
      flush();
      expect(component.control.value).toEqual(items[1].id);
    }));
  });

  describe('Multiple selection', () => {
    beforeEach(async () => {
      await setupComponent();
      component.multiple = true;
      component.options = items;
      fixture.detectChanges();
      await fixture.isStable();
    });

    it('should show a list of values with checkboxes but no search bar on click on field', fakeAsync(async () => {
      clickOnPanel();
      const list = debugElement.queryAll(By.css(listItem));
      expect(list).toHaveSize(DIGITS.THREE);
      const checkbox = debugElement.query(
        By.css('.select-panel .list .item nb-checkbox')
      );
      expect(checkbox).toBeTruthy();
      const search = debugElement.query(
        By.css('.select-panel .list .item search')
      );
      expect(search).toBeNull();
    }));

    it('should select values on click of multiple items', fakeAsync(async () => {
      clickOnPanel();
      clickOnItem(1);
      clickOnItem(DIGITS.TWO);
      expect(component.control.value).toEqual([
        items[1].id,
        items[DIGITS.TWO].id,
      ]);
      const panel = debugElement.query(By.css(listPanel));
      expect(panel).toBeTruthy();
    }));

    it('should not close panel on click of an item', fakeAsync(async () => {
      clickOnPanel();
      clickOnItem(1);
      const panel = debugElement.query(By.css(listPanel));
      expect(panel).toBeTruthy();
    }));

    it('should show selected value through tags', waitForAsync(async () => {
      component.control.setValue([
        items[1].id,
        items[DIGITS.TWO].id,
        items[0].id,
      ]);
      fixture.detectChanges();
      const input = debugElement.queryAll(By.css('.select-container nb-tag'));
      const extraCount = debugElement.query(
        By.css('.select-container .count-box')
      );
      expect(input).toHaveSize(1);
      expect(extraCount.nativeElement.innerHTML).toEqual(' +2 ');
      component.control.reset();
      fixture.detectChanges();
    }));

    it('should clear value on cross click', waitForAsync(async () => {
      component.control.setValue([
        items[1].id,
        items[DIGITS.TWO].id,
        items[0].id,
      ]);
      fixture.detectChanges();
      const input = debugElement.queryAll(By.css('.select-container nb-tag'));
      const extraCount = debugElement.query(
        By.css('.select-container .count-box')
      );
      expect(input).toHaveSize(1);
      expect(extraCount.nativeElement.innerHTML).toEqual(' +2 ');

      const cross = debugElement.query(By.css('.select-container .close-icon'));
      cross.nativeElement.click();
      fixture.detectChanges();
      expect(component.control.value).toEqual([]);
    }));
  });

  async function setupComponent() {
    await TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [
        SelectTestModule,
        SelectModule,
        NoopAnimationsModule,
        RouterTestingModule,
        ThemeModule.forRoot('arc'),
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: new AngularTranslationServiceStub(),
        },
      ],
    })
      .overrideComponent(SelectComponent, {
        set: {
          animations: [trigger('rotate', []), trigger('dropdownPanel', [])],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(SelectTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  }

  function clickOnPanel() {
    const field = debugElement.query(By.css(selectContainer));
    field.nativeElement.click();
    fixture.detectChanges();
    finishVirtualScrollInit(fixture);
    flush();
  }

  function clickOnItem(index: number) {
    const list = debugElement.queryAll(By.css(listItem));
    list[index].nativeElement.click();
    fixture.detectChanges();
    flush();
  }
});
