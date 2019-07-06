import React, { useContext, useState } from "react";
import styled from "styled-components";
import Grid from "../Grid";
import widgets from "../widgets";
import { Router, Link } from "@reach/router";
import CatalogueItem from "./CatalogueItem";

const sidebarWidth = 300;

const Layout = styled.div`
  display: grid;
  grid-template-columns: ${sidebarWidth}px 1fr;
  grid-template-rows: 100vh;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "aside main";

  font-family: sans-serif;
`;

const SideBarArea = styled.div`
  grid-area: aside;
`;

const SideBar = styled.div`
  position: fixed;
  background: #5941a9;
  width: ${sidebarWidth}px;
  height: 100vh;
  padding: 20px;

  color: white;

  ul {
    list-style-type: none;
    padding: 0;
  }

  a {
    color: currentColor;
  }
`;

const ItemArea = styled.div`
  grid-area: main;
`;

const CatalogueItemRoute = ({ widgetId }) => {
  return <CatalogueItem widgetId={widgetId} key={widgetId} />;
};

const Catalogue = () => {
  const widgetIds = Object.keys(widgets);

  return (
    <Layout as="main">
      <SideBarArea as="nav">
        <SideBar>
          <ul>
            {widgetIds.map(id => (
              <li>
                <Link to={`/catalogue/${id}`}>{id}</Link>
              </li>
            ))}
          </ul>
        </SideBar>
      </SideBarArea>
      <ItemArea>
        <Router>
          <CatalogueItemRoute path={`/:widgetId`} />
        </Router>
      </ItemArea>
    </Layout>
  );
};

export default Catalogue;
