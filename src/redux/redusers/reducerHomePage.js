const initialState = {
  user: null,
  choiceUser: null,
};

export default function reducerHomePage(state = initialState, action) {
  switch (action.type) {
    case "CLICKSTARTPAGE":
      return {
        ...state,
        user: action.payload,
      };
    case "CHOICEUSER":
      return {
        ...state,
        choiceUser: action.payload,
      };
    case "BACKHOMEPAGE":
      return {
        ...state,
        choiceUser: action.payload,
      };
    case "confirmRecording":
      return {
        ...state,
        choiceUser: null,
      };
    default:
      return state;
  }
}
