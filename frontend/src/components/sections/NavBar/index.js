import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import { useSelector } from 'react-redux';
import { useDisclosure, Button } from '@chakra-ui/react';
import './NavBar.css';
import LoginModal from '../../modals/LoginModal';
import SignUpModal from '../../modals/SignupModal';

const NavBar = ({ setAuthenticated }) => {
  const user = useSelector(state => state.session.user)

  return (
    <div className='nav-container'>
      <nav className='navbar-main'>
        <div className='navbar-left'>
          <ul>
            <li>Logo</li>
            {user &&
              <li>
                <NavLink to="/" exact={true} activeClassName="active">
                  Home
          </NavLink>
              </li>
            }
          </ul>
        </div>
        <div className='navbar-right'>
          <ul>
            {!user &&
              <li>
                <LoginModal />
              </li>
            }
            {!user &&
              <li>
                <SignUpModal />
              </li>
            }
            {user &&
              <li>
                <LogoutButton setAuthenticated={setAuthenticated} />
              </li>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;