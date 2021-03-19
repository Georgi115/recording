import React from "react";
import Stars from "../clientPage/stars";
import AddReview from "./addReview";
import { connect } from "react-redux";

const Reviews = (props) => {
  if (props.openReviews === null) {
    return <div className="reviewsBlock"></div>;
  }
  return (
    <div
      className={
        props.openReviews != null
          ? "reviewsBlock reviewsBlockOpen"
          : "reviewsBlock"
      }
    >
      <div className="reviewsBlock__name">
        <p>{props.master[props.openReviews].name}</p>
        <Stars reviews={props.master[props.openReviews].reviews} />
        <div className="closedIcon">
          <i onClick={props.closedReviews} className="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <button
        onClick={props.openAddReview}
        type="button"
        className="btn btn-secondary btn-secondary_update"
      >
        <i className="fa fa-plus"></i> Добавить отзыв
      </button>
      <ul className="list-group list-group-reviews">
        {props.master[props.openReviews].reviews.map((el) => {
          return (
            <li className="list-group-item">
              <p className="list-group-item__name">{el.name}</p>

              <Stars reviews={el.appraisal} oneStar={true} />
              <p>{el.text}</p>
            </li>
          );
        })}
      </ul>
      <AddReview />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    master: state.clientPageReducer.master,
    openReviews: state.clientPageReducer.openReviews,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closedReviews: () => dispatch({ type: "openReviews", payload: null }),
    openAddReview: () => dispatch({ type: "openAddReview" }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
