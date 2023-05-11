export enum SelectState {
  Open = 'open',
  Closed = 'closed',
}

export enum PanelType {
  Autocomplete,
  Extra,
}

export const panelConfigs = {
  [PanelType.Autocomplete]: {
    width: 0,
    height: 0,
    state: SelectState.Closed,
    list: [],
    removal: false,
    allowInput: true,
  },
  [PanelType.Extra]: {
    width: 0,
    height: 0,
    state: SelectState.Closed,
    list: [],
    removal: true,
    allowInput: false,
  },
};

export const PLACEHOLDER_ITEM = 'ADD_ROW_ITEM';
export const ITEM_HEIGHT = 38;
export const INPUT_MIN_WIDTH = 50;
export const TAG_PADDING = 5;
export const TAG_MARGIN = 4;
export const SUFFIX_WIDTH = 24;
export const SEARCH_HEIGHT = 48;
export const MIN_VISIBLE_ITEMS = 5;
