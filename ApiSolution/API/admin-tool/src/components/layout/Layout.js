import React, { Fragment } from "react";
import LoadingPanel from "../common/LoadingPanel";

const Layout = (props) => {
  return (
    <Fragment>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
