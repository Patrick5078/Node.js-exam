// Filters Reducer

const userDataReducerDefaultState = {
    fontSize: undefined,
    profilePicture: 'default.png',
    patreonAccount: '',
    theme: '',
    name: '',
    email: ''
};

export default (state = userDataReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_USER_DATA_FROM_DB':
            return {
                fontSize: action.font_size,
                profilePicture: action.profile_picture,
                patreonAccount: action.patreon_account,
                theme: action.theme,
                name: action.name,
                email: action.email

            }
        default:
            return state;
    }
};
