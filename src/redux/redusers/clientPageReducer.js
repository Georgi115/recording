const initialState = {
  userView: "sevices",
  priveuosliView: "",
  openReviews: null,
  addReview: false,
  overStarFromAddReview: null,
  addReviewError: false,
  viewTimeBlock: false,
  viewConfirmBlock: false,
  viewBlockConfirmDanger: false,
  nameReview: "",
  textReview: "",
  choiceUser: {
    name: null,
    sevice: null,
    master: null,
    date: null,
    time: null,
  },
  services: [
    {
      name: "Стрижка",
      price: 1690,
      active: false,
    },
    {
      name: "Стрижка + борода",
      price: 2650,
      active: false,
    },
    {
      name: "Коррекция бороды",
      price: 700,
      active: false,
    },
    {
      name: "Оформление бороды",
      price: 1200,
      active: false,
    },
    {
      name: "Королевское бритье",
      price: 2000,
      active: false,
    },
    {
      name: "Черная маска",
      price: 400,
      active: false,
    },
    {
      name: "Бритье головы",
      price: 1200,
      active: false,
    },
  ],
  master: [
    {
      name: "Георгий",
      active: false,
      reviews: [
        {
          name: "Генадий",
          text: "Все супер",
          appraisal: 5,
        },
        {
          name: "Анатолий",
          text: "Отлично",
          appraisal: 5,
        },
        {
          name: "Инна",
          text: "Сына подстриг супер",
          appraisal: 5,
        },
      ],
    },
    {
      name: "Денис",
      active: false,
      reviews: [
        {
          name: "Ривас",
          text: "Бороду плохо сделал",
          appraisal: 3,
        },
        {
          name: "Василий",
          text: "Не опытен",
          appraisal: 2,
        },
        {
          name: "Апачи",
          text: "Сына подстриг супер",
          appraisal: 5,
        },
      ],
    },
    {
      name: "Сергей",
      active: false,
      reviews: [
        {
          name: "Борис",
          text: "Все супер",
          appraisal: 5,
        },
        {
          name: "Антон",
          text: "Более менее",
          appraisal: 4,
        },
        {
          name: "Руслан",
          text: "Сына подстриг супер",
          appraisal: 5,
        },
      ],
    },
    {
      name: "Фирдавс",
      active: false,
      reviews: [
        {
          name: "Борис",
          text: "Все супер",
          appraisal: 5,
        },
        {
          name: "Антон",
          text: "Более менее",
          appraisal: 3,
        },
        {
          name: "Руслан",
          text: "Сына подстриг супер",
          appraisal: 5,
        },
      ],
    },
    {
      name: "Фартук",
      active: false,
      reviews: [
        {
          name: "Борис",
          text: "Все супер",
          appraisal: 2,
        },
        {
          name: "Антон",
          text: "Более менее",
          appraisal: 1,
        },
        {
          name: "Руслан",
          text: "Сына подстриг супер",
          appraisal: 5,
        },
      ],
    },
    {
      name: "Игорь",
      active: false,
      reviews: [
        {
          name: "Борис",
          text: "Все супер",
          appraisal: 5,
        },
        {
          name: "Антон",
          text: "Более менее",
          appraisal: 2,
        },
        {
          name: "Руслан",
          text: "Сына подстриг супер",
          appraisal: 3,
        },
      ],
    },
  ],
};

export default function clientPageReducer(state = initialState, action) {
  switch (action.type) {
    case "GOTOMASTER":
      const arrService = state.services.slice();
      arrService.forEach((el) => (el.active = false));
      arrService[action.payload.id].active = true;
      const userChoice = {
        ...state.choiceUser,
        sevice: action.payload.el,
      };
      return {
        ...state,
        services: arrService,
        userView: "GOTOMASTER",
        choiceUser: userChoice,
        priveuosliView: "SERVICE",
      };
    case "DATE":
      if (action.payload.event.target.classList.contains("reviews")) {
        return {
          ...state,
        };
      }
      const arrMaster = state.master.slice();
      arrMaster.forEach((el) => (el.active = false));
      arrMaster[action.payload.id].active = true;
      const choice = {
        ...state.choiceUser,
        master: action.payload,
      };
      return {
        ...state,
        master: arrMaster,
        userView: "DATE",
        choiceUser: choice,
        priveuosliView: "GOTOMASTER",
        openReviews: null,
        addReview: false,
      };
    case "choiceTime":
      if (!action.payload.active) {
        return {
          ...state,
        };
      }
      const choiceUse = {
        ...state.choiceUser,
        time: action.payload.time,
      };
      return {
        ...state,
        choiceUser: choiceUse,
        viewConfirmBlock: true,
        viewTimeBlock: false,
      };
    case "BACKPAGE":
      return {
        ...state,
        userView: action.payload,
        priveuosliView: state.userView,
        viewTimeBlock: false,
      };

    case "openReviews":
      if (action.payload === null) {
        return {
          ...state,
          openReviews: action.payload,
        };
      }

      const arr = state.master.slice();
      arr.forEach((el) => (el.active = false));
      arr[action.payload].active = true;
      return {
        ...state,
        master: arr,
        addReview: false,
        openReviews: action.payload,
      };
    case "openAddReview":
      return {
        ...state,
        addReview: true,
        addReviewError: false,
      };

    case "overStarFromAddReview":
      return {
        ...state,
        overStarFromAddReview: action.payload,
      };
    case "addReview":
      if (
        action.payload.obj.name === null ||
        action.payload.obj.text === null ||
        action.payload.obj.name === "" ||
        action.payload.obj.text === ""
      ) {
        return {
          ...state,
          addReviewError: true,
        };
      }
      const arrayMaster = state.master.slice();
      const resMaster = arrayMaster.find((el) => el.active === true);
      resMaster.reviews.unshift(action.payload.obj);
      arrayMaster.forEach((el, idx) => {
        if (el.name === resMaster.name) {
          arrayMaster.splice(idx, 1, resMaster);
        }
      });

      return {
        ...state,
        master: arrayMaster,
        addReview: false,
        addReviewError: false,
        nameReview: "",
        textReview: "",
      };
    case "changeInput":
      if (action.payload.type === "Name") {
        return {
          ...state,
          nameReview: action.payload.payload,
        };
      } else {
        return {
          ...state,
          textReview: action.payload.payload,
        };
      }
    case "CHOICEDATE":
      const choiceUser = {
        ...state.choiceUser,
      };
      choiceUser.date = action.payload;
      return {
        ...state,
        choiceUser,
        viewTimeBlock: true,
      };
    case "closeTime":
      if (action.payload.classList.contains("time-view")) {
        return {
          ...state,
          viewTimeBlock: false,
        };
      }
      return {
        ...state,
      };
    case "closeBlockConfirm":
      return {
        ...state,
        viewConfirmBlock: false,
      };
    case "changeInputName":
      const choiceUsers = {
        ...state.choiceUser,
      };
      choiceUsers.name = action.payload;

      return {
        ...state,
        choiceUser: choiceUsers,
      };
    case "confirmRecording":
      if (state.choiceUser.name === null || state.choiceUser.name === "") {
        return {
          ...state,
          viewBlockConfirmDanger: true,
        };
      }
      const service = state.services.slice();
      const master = state.master.slice();
      service.forEach((el) => {
        el.active = false;
      });
      master.forEach((el) => {
        el.active = false;
      });
      return {
        ...state,
        userView: "sevices",
        priveuosliView: "",
        openReviews: null,
        addReview: false,
        overStarFromAddReview: null,
        addReviewError: false,
        viewTimeBlock: false,
        viewConfirmBlock: false,
        viewBlockConfirmDanger: false,
        nameReview: "",
        textReview: "",
        choiceUser: {
          name: null,
          sevice: null,
          master: null,
          date: null,
          time: null,
        },
        services: service,
        master: master,
      };
    case "addMaster":
      if (action.payload.name === "") {
        return {
          ...state,
        };
      }
      const masterArr = state.master.slice();
      masterArr.push(action.payload);
      return {
        ...state,
        master: masterArr,
      };
    default:
      return state;
  }
}
