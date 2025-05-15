// components/Header.tsx
import { TipeLink } from "../types/Type";
import { NavLink } from "react-router-dom";

export default function Header() {
  const navLinks: TipeLink[] = [
    {
      path: "/",
      title: "Home"
    },
    // Puoi aggiungere altre voci di menu qui in futuro
  ];

  return (
    <header className="game-header sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning shadow">
        <div className="container">
          {/* Logo e nome del sito */}
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <i className="bi bi-controller me-2 text-warning"></i>
            <span className="fw-bold text-uppercase">Game Hub</span>
          </NavLink>
          
          {/* Pulsante hamburger per mobile */}
          <button 
            className="navbar-toggler border-warning" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Menu di navigazione */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navLinks.map((link, index) => (
                <li className="nav-item mx-1" key={index}>
                  <NavLink 
                    to={link.path} 
                    className={({ isActive }) => 
                      `nav-link px-3 py-2 ${isActive ? 'active text-warning fw-bold' : 'text-light'}`
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
              {/* Menu item di esempio - puoi rimuoverli o modificarli */}
              <li className="nav-item mx-1">
                <NavLink to="/categorie" className="nav-link px-3 py-2">Categorie</NavLink>
              </li>
              <li className="nav-item mx-1">
                <NavLink to="/nuovi" className="nav-link px-3 py-2">Nuove Uscite</NavLink>
              </li>
              <li className="nav-item mx-1">
                <NavLink to="/contatti" className="nav-link px-3 py-2">Contatti</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}