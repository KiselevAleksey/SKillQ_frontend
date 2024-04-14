export const initialState = {
    user: null,
    accountType: null,
    personalInfo: {
        isLoading: true,
        data: null,
    },
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_ACCOUNT_TYPE: "SET_ACCOUNT_TYPE",
    SET_PERSONAL_INFO: "SET_PERSONAL_INFO",
};


const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
                accountType: action.accountType,
                personalInfo: action.personalInfo, // Set personalInfo directly
            };
        default:
            return state;
    }
};

export default reducer;
