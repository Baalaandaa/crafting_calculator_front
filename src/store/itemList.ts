import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Item, getItemList } from "../services/jsonPlaceholder";
import { AppThunk, AppState } from ".";

interface ItemList {
    readyStatus: string;
    items: Item[];
    error: string | null;
}

export const initialState: ItemList = {
    readyStatus: "invalid",
    items: [],
    error: null,
};

const itemList = createSlice({
    name: "itemList",
    initialState,
    reducers: {
        getRequesting: (state: ItemList) => {
            state.readyStatus = "request";
        },
        getSuccess: (state, { payload }: PayloadAction<Item[]>) => {
            state.readyStatus = "success";
            state.items = payload;
        },
        getFailure: (state, { payload }: PayloadAction<string>) => {
            state.readyStatus = "failure";
            state.error = payload;
        },
    },
});

export default itemList.reducer;
export const { getRequesting, getSuccess, getFailure } = itemList.actions;

export const fetchItemList = (): AppThunk => async (dispatch) => {
    dispatch(getRequesting());

    const { error, data } = await getItemList();

    if (error) {
        dispatch(getFailure(error.message));
    } else {
        dispatch(getSuccess(data as Item[]));
    }
};

const shouldFetchItemList = (state: AppState) =>
    state.itemList.readyStatus !== "success";

export const fetchItemListIfNeed = (): AppThunk => (dispatch, getState) => {
    if (shouldFetchItemList(getState())) return dispatch(fetchItemList());

    return null;
};
