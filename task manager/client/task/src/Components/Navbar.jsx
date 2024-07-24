// import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary px-5 shadow">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACY0lEQVR4nO2ZX2/SUBjG+33cF/BG73B67YxLvNEP0LBE/QoLNbudlyrExWUZSaEtnUz5t8zELDMRmGaFlrVAh8JneE2Lra/hyMrhaGtynuQJ+cFp8j7veeAGQeDi4uLi+ltabW/cSZ2lnVtf0hCXU2dpJ/V1Y5UqwLXj+87Kh3VIgC+oAiRgcAjMA6zwG1j/9xXa/6hBUizQ6Ng8haRYoNEnuw1JsUCj9uAckmKBRueuCYtYax7C3kkRtM/vIvGm+QJEYws2uy+JjE0VwBzZsIi94QJHYdHYCk1ibKoAvW99WMR6s+IP571G4YyZ9YeVrCyRsakC2N8HkBQLNOqPh4Ctt977GzxoVZhwxnoVbpzE2FQBBmMXsHGHWbCIOk9ibCYBvM35G2xWZtioFaH2ZA0aD2/6r526Mve8x5I17fwzK0vkpQMMx5cQxUZNgaMH12dsVORIzw8jmEkAPdhgq/ob1x/f9QeWi899lgvbPteerhHPB5z5uXHJyhGZeQDcYcxebbyB8ecee++Tzgcsos6TePkAk0vA9jYX/IpgDm+gsD29ATm4gXvE8wFLVm7a+V6WyNhMAvzJnbpK/A50Glqk54cRTBXAnYwAO/wVaVVnuFtX/c43Ht3wN99taHPPeyyhzpMYm0kA3GEWLKLOk5h5gF8drjJhKex8jsjMA8Rpgc0NzO/0VRx7gL0lOx97gIMlOx97APd/+w50HTP2wd3JCLqORRcgrxfAGvRiHd7sX0C+JNMF2Mm/cXbyuxC3X+/v2lQB1EP1tvK25KjlEsRlpazZSlmn+4ODi4uLi0u4Qj8A92oKx8EcIX0AAAAASUVORK5CYII="/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2">
                <a className=" btn btn-info text-white" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className=" btn btn-success text-white" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
