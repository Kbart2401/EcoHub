import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import { useSelector } from 'react-redux';
import LoginModal from '../../modals/LoginModal';
import SignUpModal from '../../modals/SignupModal';
import { AiTwotoneHome } from 'react-icons/ai';
import { Input } from '@chakra-ui/react';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const [search, setSearch] = useState('')


  const onSearch = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/users/')
    const users = await res.json()
    setSearch('')
    return history.push('/users', { users })
  }

  return (
    <div className='nav-container'>
      <nav className='navbar-main'>
        <div className='navbar-left'>
          <ul>
            <li>Logo</li>
            {user &&
              <>
                <li>
                  <NavLink to="/" exact={true} activeClassName="active">
                    <AiTwotoneHome />
                  </NavLink>
                </li>
                <li>
                  <form onSubmit={onSearch}>
                    <Input onChange={e => setSearch(e.target.value)}
                      placeholder='search EcoHub users' value={search}></Input>
                  </form>
                </li>
              </>
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
                <LogoutButton />
              </li>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;