export let store;

export const addContext = (state) => store = {...store, ...state};