import React from "react";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap/";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../Redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkStyle = {
    textDecoration: "none",
    marginRight: "5px",
    color: "white",
  };

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(Logout());
    navigate("/login");
  };
  return (
    <div>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="ms-auto">
            {userInfo ? (
              <NavDropdown
                title={
                  <div>
                    <h6> {userInfo.name} </h6>
                    <img
                      src={userInfo.profileImage}
                      style={{ width: "80px", height: "80px" }}
                      alt="pt"
                    />
                  </div>
                }
              >
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to={"/login"} style={linkStyle}>
                  Sign in
                </Link>
                <Link to={"/register"} style={linkStyle}>
                  Sign up
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
