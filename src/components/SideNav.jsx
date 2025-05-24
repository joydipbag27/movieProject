import Navigation from "./Navigation";
import logo from "../assets/DogmovieHD Full Logo.png";
import mobileLogo from "../assets/DogmovieHD Icon.png"

function SideNav() {
  
  return (
    <div className="sideNav">
      <div className="logo">
        <picture>
          <source srcSet={mobileLogo} media="(max-width: 768px)" />
          <img src={logo} alt="logo" />
        </picture>
      </div>
      <Navigation/>
    </div>
  );
}

export default SideNav;
