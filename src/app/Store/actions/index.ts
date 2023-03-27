import { createAction, props } from "@ngrx/store";

export const getIbookContent = createAction('[IBook] get book content');
export const getIbookContentSuccess = createAction('[IBook] get book content success');
export const getIbookContentFailure = createAction('[IBook] get book content failture');


export const updateIbookContent = createAction(
  '[IBook] Update book content',
  props<{ newContent: string }>()
);

