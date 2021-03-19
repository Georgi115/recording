const initialState = {
  date: {
    day: null,
    month: null,
    year: null,
    monthNumber: null,
  },

  addRecordingBlock: false,

  addRecording: {},
  dangerAddRecording: false,
  recording: null,
  recordingClient: [
    {
      nameUser: "Виталий",
      name: "Георгий",
      time: "10:00",
      service: "Cтрижка машинка ножницы",
      date: "26 January 2021",
    },
    {
      nameUser: "Виталий",
      name: "Денис",
      time: "10:00",
      service: "Cтрижка машинка ножницы",
      date: "26 January 2021",
    },
    {
      nameUser: "Рашид",
      service: "Cтрижка машинка ножницы",
      name: "Георгий",
      time: "13:00",
      date: "26 January 2021",
    },
    {
      nameUser: "Иван",
      name: "Георгий",
      time: "19:00",
      service: "Cтрижка машинка ножницы",
      date: "28 January 2021",
    },
    {
      nameUser: "Виталий",
      name: "Георгий",
      time: "10:00",
      service: "Cтрижка машинка ножницы",
      date: "27 January 2021",
    },
    {
      nameUser: "Виталий",
      name: "Денис",
      time: "10:00",
      service: "Cтрижка машинка ножницы",
      date: "20 January 2021",
    },
    {
      nameUser: "Рашид",
      service: "Cтрижка машинка ножницы",
      name: "Георгий",
      time: "13:00",
      date: "1 February 2021",
    },
    {
      nameUser: "Иван",
      name: "Георгий",
      time: "19:00",
      service: "Cтрижка машинка ножницы",
      date: "2 February 2021",
    },
    {
      nameUser: "Виталий",
      name: "Георгий",
      time: "10:00",
      service: "Cтрижка машинка ножницы",
      date: "3 February 2021",
    },
    {
      nameUser: "Виталий",
      name: "Денис",
      time: "10:00",
      service: "Cтрижка машинка ножницы",
      date: "2 February 2021",
    },
    {
      nameUser: "Рашид",
      service: "Cтрижка машинка ножницы",
      name: "Георгий",
      time: "13:00",
      date: "4 February 2021",
    },
    {
      nameUser: "Иван",
      name: "Георгий",
      time: "19:00",
      service: "Cтрижка машинка ножницы",
      date: "5 February 2021",
    },
  ],
};

export default function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case "INSTALLDATE":
      return {
        ...state,
        date: {
          toString() {
            return `${this.day} ${this.month} ${this.year}`;
          },
          ...action.payload,
        },
      };

    case "confirmRecording":
      if (action.payload.name === null || action.payload.name === "") {
        return {
          ...state,
        };
      }
      const arr = state.recordingClient.slice();
      arr.push({
        nameUser: action.payload.name,
        name: action.payload.master.el.name,
        time: action.payload.time,
        date: action.payload.date,
        service: action.payload.sevice.name,
      });
      return {
        ...state,
        recordingClient: arr,
      };
    case "deleteRecording":
      const arrRecording = state.recordingClient.slice();
      const idx = arrRecording.findIndex((el) => {
        if (
          el.name === action.payload.name &&
          el.date === action.payload.date &&
          el.nameUser === action.payload.nameUser &&
          el.time === action.payload.time
        ) {
          return true;
        } else {
          return false;
        }
      });
      arrRecording.splice(idx, 1);
      return {
        ...state,
        recordingClient: arrRecording,
      };
    case "openAddRecordingBlock":
      if (action.payload.e.classList.contains("num")) {
        const obj = {
          ...state.addRecording,
        };
        obj.date = action.payload.date.toString();
        obj.time = action.payload.time;
        obj.name = action.payload.name;
        return {
          ...state,
          addRecordingBlock: true,
          addRecording: obj,
        };
      } else {
        return {
          ...state,
        };
      }

    case "closeAddRecordingBlock":
      if (action.payload.classList.contains("addRecording")) {
        document.querySelector(".inputAddRecording").value = "";
        return {
          ...state,
          addRecording: {},
          addRecordingBlock: false,
          dangerAddRecording: false,
        };
      } else {
        return {
          ...state,
        };
      }
    case "clickService":
      const objct = {
        ...state.addRecording,
      };
      objct.service = action.payload;

      return {
        ...state,
        addRecording: objct,
      };
    case "changeNameUser":
      const object = {
        ...state.addRecording,
      };
      object.nameUser = action.payload;

      return {
        ...state,
        addRecording: object,
      };

    case "addRecordingClick":
      if (
        !state.addRecording.service ||
        !state.addRecording.nameUser ||
        state.addRecording.nameUser.trim() === ""
      ) {
        return {
          ...state,
          dangerAddRecording: true,
        };
      } else {
        document.querySelector(".inputAddRecording").value = "";
        const arrRec = state.recordingClient.slice();
        const object2 = {
          ...state.addRecording,
        };
        object2.admin = true;
        arrRec.push(object2);
        return {
          ...state,
          dangerAddRecording: false,
          recordingClient: arrRec,
          addRecordingBlock: false,
          addRecording: {},
        };
      }

    default:
      return state;
  }
}
