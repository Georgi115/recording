import React from "react";
import "./clientPage.css";
import Stars from "./stars";
import Reviews from "./reviews";
import Calendar from "./calendar";
import ConfirmRecording from "./confirmRecording";

import { connect } from "react-redux";

const ClientPage = (props) => {
  console.log(props.reviewsOpen);
  let classServices;
  let classMaster = "";
  let classDate;
  if (props.reviewsOpen !== null) {
    classMaster = "closeScroll";
  }
  if (props.userView === "sevices") {
    classServices = "list-group list-group-view-sevices";
    classMaster += " list-group list-group-none-master";
    classDate = "list-group list-group-none-date";
  } else if (props.userView === "GOTOMASTER") {
    classServices = "list-group list-group-none-services";
    classMaster += " list-group list-group-view-master";
    classDate = "list-group list-group-none-date";
  } else if (props.userView === "DATE") {
    classServices = "list-group list-group-none-services";
    classMaster += " list-group list-group-view-master-left";
    classDate = "list-group list-group-view-date";
  }
  return (
    <div
      className="mainBlockPageClient"
      style={{
        background:
          "url(https://2.bp.blogspot.com/-ofyJgJKe6BA/XeH5XfAJ-QI/AAAAAAAAAAQ/D7d79O0tBokRAJxq7g8HWJspwwmkgQs7QCK4BGAYYCw/w1684-h1069-p-k-no-nu/barber-1.jpg)  no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
      }}
    >
      <ConfirmRecording />
      <div className="backHomePage">
        <button
          onClick={props.backToHome}
          type="button"
          className="btn btn-dark"
        >
          Вернутся на главную страницу
        </button>
      </div>
      <div className="container">
        {" "}
        <div className="group">
          <div className={classServices}>
            <p class="text-white">Выбирайте услугу</p>
            {props.services.map((el, id) => {
              return (
                <button
                  onClick={() => props.goToNext("GOTOMASTER", el, id)}
                  key={id}
                  type="button"
                  className={
                    el.active
                      ? "list-group-item list-group-item-action bg-info"
                      : "list-group-item list-group-item-action"
                  }
                >
                  {el.name} <span>{el.price} ₽</span>
                </button>
              );
            })}
          </div>
          <div className={classMaster}>
            <Reviews />
            <p class="text-white">Выбирайте мастера</p>
            <button
              onClick={() => props.backPage("sevices")}
              type="button"
              className="btn btn-secondary btn-sm btn-backToMaster"
            >
              Вернутся к выбору услуги
            </button>
            {props.master.map((el, id) => {
              return (
                <button
                  onClick={(event) => props.goToNext("DATE", el, id, event)}
                  key={id}
                  type="button"
                  className={
                    el.active
                      ? "list-group-item list-group-item-action bg-info"
                      : "list-group-item list-group-item-action"
                  }
                >
                  {el.name}
                  <br></br>
                  <Stars reviews={el.reviews} />
                  <div>
                    <span
                      onClick={() => props.openReviews(id)}
                      className="reviews"
                    >
                      Отзывы
                    </span>{" "}
                    {props.reviewsOpen === id ? (
                      <i className="fa fa-angle-right"></i>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
          <div className={classDate}>
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    services: state.clientPageReducer.services,
    userView: state.clientPageReducer.userView,
    master: state.clientPageReducer.master,
    priveuosliView: state.clientPageReducer.priveuosliView,
    reviewsOpen: state.clientPageReducer.openReviews,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    backToHome: () => dispatch({ type: "BACKHOMEPAGE", payload: null }),
    goToNext: (str, el, id, event) =>
      dispatch({ type: str, payload: { el, id, event } }),
    backPage: (str) => dispatch({ type: "BACKPAGE", payload: str }),
    openReviews: (id) => dispatch({ type: "openReviews", payload: id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
