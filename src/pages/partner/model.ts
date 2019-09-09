import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { create, update, fetchSimpleList, fetchPartnerList } from './service';

import { simpleList, partnerList } from './data.d';

export interface StateType {
  simpleList: simpleList,
  partnerList: partnerList,
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    create: Effect;
    update: Effect;
    fetchSimpleList: Effect;
    fetchPartnerList: Effect;
  };
  reducers: {
    saveSimpleList: Reducer<StateType>,
    savePartnerList: Reducer<StateType>
  };
}

const Model: ModelType = {
  namespace: 'partner',

  state: {
    simpleList: {
      rows: [],
      pagination: {}
    },
    partnerList: {
      rows: [],
      pagination: {}
    }
  },

  effects: {
    * create({ payload, callback }, { call, put }) {
      const response = yield call(create, payload);
      if (callback) callback(response);
    },
    * update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (callback) callback(response);
    },

    * fetchSimpleList({ payload, callback }, { call, put }) {
      const response = yield call(fetchSimpleList, payload);
      yield put({
        type: 'saveSimpleList',
        payload: response,
      });
    },
    * fetchPartnerList({ payload, callback }, { call, put }) {
      const response = yield call(fetchPartnerList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

  },

  reducers: {
    saveSimpleList(state, action) {
      return {
        ...state,
        simpleList: action.payload
      }
    },
    savePartnerList(state, action) {
      return {
        ...state,
        partnerList: action.payload,
      };
    },
  },
};

export default Model;
