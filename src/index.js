import { Col, Layout, Row, Spin } from "antd";
import "antd/dist/antd.css";
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Home from './containers/home'
import "./list-sorter.css"

const StyledCol = styled(Col)`
  align-items: center;
  display: flex;
  height: 64px;
  justify-content: space-evenly;

  @media (max-width: 575px) {
    &.ant-col-xs-0 {
      display: none;
    }
  }
`;
const StyledLayoutContent = styled(Layout.Content)`
  background: #fff;
  font-family: Open Sans;
  min-height: 100vh;
  padding: 0px 9.375vw 120px 9.375vw;
`;
const StyledHeader = styled(Layout.Header)`
  background: #4d00b4;
`;

class App extends PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Patterns of Coordination</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i"
            rel="stylesheet"
          />
        </Helmet>
        <BrowserRouter>
          <Layout>
            <StyledHeader>
              <Row>
                <StyledCol lg={4} md={4} sm={16} xs={12}>
                </StyledCol>
                <Col
                  lg={16}
                  md={16}
                  xs={12}
                  style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  Patterns of Coordination
                </Col>
                <StyledCol lg={4} md={4} sm={8} xs={24} />
              </Row>
            </StyledHeader>
            <StyledLayoutContent>
              <Switch>
                <Route
                  render={(props) => <Home {...props}/>}
                  exact
                  path="/"
                />
              </Switch>
            </StyledLayoutContent>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
