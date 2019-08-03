import * as actionTypes from "../actions/actionTypes";

const initialState = {
    items: []
};

const notifySend = (state, action) => {
    return {
        ...state,
        items: state.items.concat(action.item)
    }
};

const notifyDismiss = (state, action) => {
    return {
        ...state,
        items: state.items.filter(i => i.key !== action.item.key)
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NOTIFY_SEND: return notifySend(state, action);
        case actionTypes.NOTIFY_DISMISS: return notifyDismiss(state, action);
        default: return state;
    }
};

export default reducer;