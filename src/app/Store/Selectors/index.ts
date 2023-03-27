import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const selectIbookState = (state: any) => state.state as AppState;

export const selectIbookContent = createSelector(
  selectIbookState,
  (state) => state?.ibookContent
);

export const selectIbookLoading = createSelector(
  selectIbookState,
  (state) => state?.loading
);

export const selectIbookError = createSelector(
  selectIbookState,
  (state) => state?.error
);

