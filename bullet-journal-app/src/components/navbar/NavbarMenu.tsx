import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import {
  HashRouter as Router,
  Route,
  Switch,
  NavLink as RRNavLink,
} from "react-router-dom";
import LogDisplay from "../logDisplay/LogDisplay";
const NavbarMenu: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Router>
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand to="/" activeClassName="active" exact tag={RRNavLink}>
            Logs
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  to="/dailyLog/"
                  activeClassName="active"
                  tag={RRNavLink}
                >
                  Daily Log
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/monthlyLog/"
                  activeClassName="active"
                  tag={RRNavLink}
                >
                  Monthly Log
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/futureLog/"
                  activeClassName="active"
                  tag={RRNavLink}
                >
                  Future Log
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Bullet Journal</NavbarText>
          </Collapse>
        </Navbar>
        <Switch>
          <Route path="/dailyLog">
            <LogDisplay type="daily" />
          </Route>
          <Route path="/monthlyLog">
            <LogDisplay type="monthly" />
          </Route>
          <Route path="/futureLog">
            <LogDisplay type="future" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default NavbarMenu;
