import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { getIbookContent, updateIbookContent } from '../actions';

export interface AppState {
  ibookContent: string;
  loading: boolean,
  error: string,
}

export const initialState: AppState = {
  ibookContent: 'hello world',
  loading: false,
  error: ''
};

export const ibookContentReducer = createReducer(
  initialState,
  on(getIbookContent, (state) => state),
  on(updateIbookContent, (state, { newContent }) => ({
    ...state,
    ibookContent: newContent
  })),
);
