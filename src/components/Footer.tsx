import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="game-footer bg-dark text-light py-5 mt-5 border-top border-warning">
      <div className="container">
        <div className="row g-4">
          {/* Logo e descrizione */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-controller fs-2 text-warning me-2"></i>
              <h5 className="mb-0 text-uppercase fw-bold">Game Hub</h5>
            </div>
            <p className="text-light opacity-75">
              La tua destinazione definitiva per scoprire, esplorare e conoscere i migliori videogiochi di sempre.
            </p>
            <div className="social-icons d-flex gap-3 mt-3">
              <a href="#" className="text-light fs-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-discord"></i></a>
            </div>
          </div>
          
          {/* Collegamenti rapidi */}
          <div className="col-lg-2 col-6">
            <h6 className="text-warning mb-3">Collegamenti</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/categorie" className="text-light text-decoration-none">Categorie</Link></li>
              <li className="mb-2"><Link to="/nuovi" className="text-light text-decoration-none">Nuove Uscite</Link></li>
              <li className="mb-2"><Link to="/contatti" className="text-light text-decoration-none">Contatti</Link></li>
            </ul>
          </div>
          
          {/* Categorie */}
          <div className="col-lg-2 col-6">
            <h6 className="text-warning mb-3">Categorie</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/categorie/action" className="text-light text-decoration-none">Action</Link></li>
              <li className="mb-2"><Link to="/categorie/adventure" className="text-light text-decoration-none">Adventure</Link></li>
              <li className="mb-2"><Link to="/categorie/rpg" className="text-light text-decoration-none">RPG</Link></li>
              <li className="mb-2"><Link to="/categorie/strategy" className="text-light text-decoration-none">Strategy</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-lg-4">
            <h6 className="text-warning mb-3">Resta Aggiornato</h6>
            <p className="text-light opacity-75 mb-3">Iscriviti alla nostra newsletter per ricevere aggiornamenti sui nuovi giochi.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control bg-dark text-light border-warning" 
                     placeholder="La tua email" aria-label="Email" aria-describedby="button-addon2" />
              <button className="btn btn-warning text-dark fw-bold" type="button" id="button-addon2">
                Iscriviti
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-top border-secondary mt-4 pt-4 text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-light opacity-75">© {currentYear} Game Hub. Tutti i diritti riservati.</p>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="/privacy" className="text-light opacity-75 text-decoration-none small">Privacy Policy</Link>
                </li>
                <li className="list-inline-item ms-3">
                  <Link to="/termini" className="text-light opacity-75 text-decoration-none small">Termini di Servizio</Link>
                </li>
                <li className="list-inline-item ms-3">
                  <Link to="/cookie" className="text-light opacity-75 text-decoration-none small">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}