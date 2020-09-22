import React from "react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";
import { connect } from "react-redux";
import "./style.css";
const Navbar = (props) => {
  const { auth } = props;
  const navLinks = auth.uid ? <SignInLinks user={props} /> : <SignOutLinks />;
  return (
    <div>
      <div className="navbar-fixed">
        <nav
          className="nav-warpper dream-edges"
          id="navbar"
          style={{
            position: "fixed",
            transition: "top 0.5s",
            top: "0",
            zIndex: "1",
          }}
        >
          {auth.isLoaded && navLinks}
          <MobileNav auth={auth} />
          <Logo />
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);

//Show navbar on when user scrolls up and hide it when he scrolls down.
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-5em";
  }
  prevScrollpos = currentScrollPos;
};
