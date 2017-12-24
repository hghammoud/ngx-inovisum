import { Reducer, ReducerAction } from './reducer';
import * as  _ from 'lodash';

export class ObjectReducer {

    public static SET = '_SET';
    public static CLEAR = '_CLEAR';

    public static set(prefix: string, _payload: any) {
        return { type: prefix + ObjectReducer.SET, payload: _payload } as ReducerAction;
    }

    public static clear(prefix: string, _payload: any) {
        return { type: prefix + ObjectReducer.CLEAR, payload: _payload } as ReducerAction;
    }

    public static reducer(prefix: string) {
        function reduceFunction(state: any = null, action: ReducerAction) {
            switch (action.type) {
                case prefix + ObjectReducer.SET:
                    if (state !== action.payload) {
                        return action.payload;
                    } else {
                        return state;
                    }
                case prefix + ObjectReducer.CLEAR:
                    return null;
                default:
                    return state;
            }
        };
        return reduceFunction;
    }
}
