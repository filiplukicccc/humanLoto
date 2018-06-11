export default function reducer(state, action) {
    if (action.type === "ADD_TOKEN") {
      const newState = { ...state, token: action.token, username: action.username };
      return newState;
    }
    return state;
  }
  