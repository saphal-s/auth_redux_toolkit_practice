import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Container>
        <Link to="/">
          <h2>Mern auth</h2>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    <Link
                      to="/profile"
                      className="text-dark text-decoration-none "
                    >
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/logout"
                      className="text-decoration-none text-dark"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white text-decoration-none pe-2"
                >
                  <FaSignInAlt /> Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-white text-decoration-none ps-2"
                >
                  <FaSignOutAlt /> Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
