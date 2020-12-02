import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainContent from "../mainContent/MainContent";
import DailyLog from "../dailyLog/DailyLog";
import MonthlyLog from "../monthlyLog/MonthlyLog";
import FutureLog from "../futureLog/FutureLog";
const NavbarMenu: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Router>
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Bullet Journal</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/dailyLog/">Daily Log</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/monthlyLog/">Monthly Log</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/futureLog/">Future Log</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Sign Up</NavbarText>
          </Collapse>
        </Navbar>
        <Switch>
          <Route path="/dailyLog">
            <DailyLog />
          </Route>
          <Route path="/monthlyLog">
            <MonthlyLog />
          </Route>
          <Route path="/futureLog">
            <FutureLog />
          </Route>
          <Route path="/">
            <MainContent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default NavbarMenu;
