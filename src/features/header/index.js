import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuthenticated } from '../auth/authSlice';

function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <Link className="navbar-brand" to="/">conduit</Link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>
          {isAuthenticated ?
            <>
              <li class="nav-item">
                <Link to="/editor" className="nav-link" > <i class="ion-compose"></i>&nbsp;New Article </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/settings" > <i class="ion-gear-a"></i>&nbsp;Settings </Link>
              </li>
              {/* <li class="nav-item"> */}
              {/*   <Link className="nav-link" > <i class="ion-gear-a"></i>&nbsp;{user.name}</Link> */}
              {/* </li> */}
            </> :
            <>
              <li class="nav-item">
                <Link className="nav-link" to="/login">Sign in</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/register">Sign up</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/register"></Link>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}
export default Header
