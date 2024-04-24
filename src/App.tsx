import React, { Fragment } from "react";
import { GlobalStyle } from "@/style/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layout/defaultLayout/DefaultLayout";
import { publicRoutes } from "@/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <div className="app">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.components;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
