import * as actionTypes from "./actionTypes";

/**
 * @param notify
 * @returns {Function}
 */

export const notifySend = (notify) => {
    let item = {...notify};
    if (!item.key) {
        item.key = new Date().getTime();
    }
    return dispatch => {
        dispatch({
            type: actionTypes.NOTIFY_SEND,
            item
        });
    }
};

export const notifyDismiss = (item) => {
    return {
        type: actionTypes.NOTIFY_DISMISS,
        item
    }
};

export const notifyClear = () => {
    return { type: actionTypes.NOTIFY_CLEAR}
}