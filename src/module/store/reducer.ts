import { Action } from '@ngrx/store';

export interface ReducerAction extends Action {
  type: string;
  payload?: any;
}

export type Reducer<T> = (state: any, action: ReducerAction) => any;
