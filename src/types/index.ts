import { Action, ActionCreator, Middleware } from 'redux';
import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk';
import { TConstructorActions } from '../services/actions/burger-constructor';
import { TIngredientsActions } from '../services/actions/burger-ingredients';
import { store } from '../services/store';
import { TAuthActions } from './../services/actions/auth';
import { TFeedActions } from './../services/actions/feed';
import { THistoryActions } from './../services/actions/history';

type TApplicationActions = TAuthActions
   | TIngredientsActions
   | TConstructorActions
   | TFeedActions
   | THistoryActions

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

type ThunkDispatch = ReduxThunkDispatch<any, Action, TApplicationActions>
export type ThunkMiddleware = Middleware<ThunkDispatch, any, ThunkDispatch>

export type AppThunk<ReturnType = void> = ActionCreator<
   ThunkAction<ReturnType, RootState, Action, TApplicationActions>
>;