const initialState = {
  choiceDateAdmin: null,
  viewBigBlock: false,
  addMasterBlock: false,


  newMaster: {
    name: "",
    active: null,
    reviews: null,
  },
  errorAddMaster: false,
  clickDetailsRecording: null,
};

export default function adminPageReducer(state = initialState, action) {
  switch (action.type) {
    case "clickAdminChoice":
      console.log(action);
      if (action.payload.day === null)
        return {
          ...state,
        };
      return {
        ...state,
        choiceDateAdmin: {
          ...action.payload,
          toString() {
            return `${this.day} ${this.month} ${this.year}`;
          },
        },
      };
    case "backToday":
      return {
        ...state,
        choiceDateAdmin: null,
      };
    case "ViewMainBlock":
      return {
        ...state,
        viewBigBlock: !state.viewBigBlock,
      };

    case "viewAddMasterBlock":
      return {
        ...state,
        addMasterBlock: !state.addMasterBlock,
      };
    case "addMasterName":
      return {
        ...state,
        errorAddMaster: false,
        newMaster: {
          name: action.payload,
          active: false,
          reviews: [],
        },
      };
    case "addMaster":
      if (state.newMaster.name === "") {
        return {
          ...state,
          errorAddMaster: true,
        };
      }
      return {
        ...state,
        addMasterBlock: false,
        newMaster: {
          name: "",
          active: null,
          reviews: null,
        },
      };
    case "ClickRecording":
      return {
        ...state,
        clickDetailsRecording: action.payload,
      };

    case "closeDetails":
      console.log(action.payload);
      if (action.payload.classList.contains("detailsRecording")) {
        return {
          ...state,
          clickDetailsRecording: null,
        };
      } else {
        return {
          ...state,
        };
      }
    case "deleteRecording":
      return {
        ...state,
        clickDetailsRecording: null,
      };

    default:
      return state;
  }
}
