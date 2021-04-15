const immutableReducer = (state = ['Do not mutate state!'], action) => {
    switch (action.type) {
        case 'ADD_TO_DO':
            // Don't mutate state here or the tests will fail
            return [...state, action.data];
        default:
            return state;
    }
};

const addToDo = (todo) => {
    return {
        type: 'ADD_TO_DO',
        data: todo
    }
}

const store = Redux.createStore(immutableReducer);