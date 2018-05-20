// Modal Reducer

const modalReducerDefaultState = {
    isOpen: false,
    isLogin: true
};

export default (state = modalReducerDefaultState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                isOpen: true
            }
        case 'CLOSE_MODAL':
            return {
                isOpen: false,
                isLogin: true
            }
        case 'SWITCH_DISPLAY':
            return {
                ...state,
                isLogin: !state.isLogin
            }
        default:
            return state;
    }
};
