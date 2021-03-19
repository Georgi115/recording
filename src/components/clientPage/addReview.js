import React from "react";
import { connect } from "react-redux";

const AddReview = (props) => {
  let elem = null;
  props.master.forEach((el) => {
    if (el.active) {
      elem = el;
    }
  });

  let block = [];

  for (let i = 0; i < 5; i++) {
    block.push(`fa fa-star fa-3x fa-orange`);
  }

  const obj = {
    name: null,
    text: null,
    appraisal: null,
  };
  obj.appraisal = props.overStar + 1;

  obj.name = props.nameReview;
  obj.text = props.textReview;

  return (
    <div
      className={props.addReviews ? "addReview addReviewOpen " : "addReview"}
    >
      <h2>Заполните форму</h2>
      <div class="form-group">
        <input
          value={props.nameReview}
          onChange={(e) => {
            props.changeInput(e, "Name");
          }}
          type="text"
          class="form-control"
          placeholder="Имя"
        ></input>
        <textarea
          value={props.textReview}
          onChange={(e) => {
            props.changeInput(e, "Review");
          }}
          placeholder={`Ваш отзыв на мастера ${elem.name}`}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div className="blockStar">
        <p>Поставьте оценку</p>
        {block.map((el, id) => {
          return (
            <i
              onMouseOver={() => props.overStarFromAddReview(id)}
              key={id}
              className={
                props.overStar >= id ? `${el} fa-yes-orange ` : `${el}`
              }
            ></i>
          );
        })}
      </div>
      {props.addReviewError ? (
        <p className="addReviewError">Заполните поля "Имя" и "Отзыв"</p>
      ) : null}
      <button
        onClick={() => props.addReview(obj)}
        type="button"
        class="btn btn-success"
      >
        Добавить отзыв
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    addReviews: state.clientPageReducer.addReview,
    master: state.clientPageReducer.master,
    overStar: state.clientPageReducer.overStarFromAddReview,
    addReviewError: state.clientPageReducer.addReviewError,
    nameReview: state.clientPageReducer.nameReview,
    textReview: state.clientPageReducer.textReview,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    overStarFromAddReview: (id) =>
      dispatch({ type: "overStarFromAddReview", payload: id }),
    addReview: (obj) => dispatch({ type: "addReview", payload: { obj } }),
    changeInput: (e, el) =>
      dispatch({
        type: "changeInput",
        payload: { payload: e.target.value, type: el },
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
