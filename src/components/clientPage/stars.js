import React from "react";

const Stars = ({ reviews, oneStar }) => {
  if (oneStar) {
    let block = [];

    for (let i = 0; i < 5; i++) {
      if (i < reviews) {
        block.push(<i className="fa fa-star colorBl"></i>);
      } else {
        block.push(<i className="fa fa-star"></i>);
      }
    }
    return (
      <div>
        {block.map((el) => {
          return el;
        })}
      </div>
    );
  }

  let num;
  const res = reviews.reduce((acc, el, id) => {
    acc += el.appraisal;
    num = id + 1;
    return acc;
  }, 0);

  const result = Math.round(res / num);

  let block = [];

  for (let i = 0; i < 5; i++) {
    if (i < result) {
      block.push(<i className="fa fa-star colorBl"></i>);
    } else {
      block.push(<i className="fa fa-star"></i>);
    }
  }

  return (
    <div>
      {block.map((el) => {
        return el;
      })}
    </div>
  );
};

export default Stars;
