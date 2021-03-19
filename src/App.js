import React from "react";
import StartPage from "./components/startPage/startPage";
import ClientPage from "./components/clientPage/clientPage";
import AdminPage from "./components/adminPage/adminPage";
import { connect } from "react-redux";

function App(props) {
  return (
    <div>
      <StartPage></StartPage>
      {props.choice === "admin" ? <AdminPage /> : <ClientPage />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    choice: state.reducerHomePage.choiceUser,
  };
}

export default connect(mapStateToProps)(App);
