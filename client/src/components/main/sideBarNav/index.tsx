import { useState } from 'react';
import './index.css';
import { NavLink, useLocation } from 'react-router-dom';
import useUserContext from '../../../hooks/useUserContext';
import {
  MessageCircleQuestionMark,
  MessagesSquare,
  Tag,
  User,
  Gamepad,
  Users,
  LibraryBig,
  UserPen,
} from 'lucide-react';

/**
 * The SideBarNav component has a sidebar navigation menu for all the main pages.
 * It highlights the currently selected item based on the active page and
 * triggers corresponding functions when the menu items are clicked.
 */
const SideBarNav = () => {
  const { user } = useUserContext();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const location = useLocation();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const isActiveOption = (path: string) =>
    location.pathname === path ? 'message-option-selected ' : '';

  return (
    <div id='sideBarNav' className='sideBarNav'>
      <NavLink
        to='/home'
        id='menu_questions'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        <MessageCircleQuestionMark />
        Questions
      </NavLink>
      <NavLink
        to='/tags'
        id='menu_tag'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        <Tag />
        Tags
      </NavLink>
      <NavLink
        to='/messaging'
        id='menu_messaging'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}
        onClick={toggleOptions}>
        <MessagesSquare />
        Messaging
      </NavLink>
      {showOptions && (
        <div className='additional-options'>
          <NavLink
            to='/messaging'
            className={`menu_button message-options ${isActiveOption('/messaging')}`}>
            Global Messages
          </NavLink>
          <NavLink
            to='/messaging/direct-message'
            className={`menu_button message-options ${isActiveOption('/messaging/direct-message')}`}>
            Direct Messages
          </NavLink>
        </div>
      )}
      <NavLink
        to='/users'
        id='menu_users'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        <User />
        Users
      </NavLink>
      <NavLink
        to='/games'
        id='menu_games'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        <Gamepad />
        Games
      </NavLink>
      <NavLink
        to='/communities'
        id='menu_communities'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        <Users />
        Communities
      </NavLink>
      <NavLink
        to={`/collections/${user.username}`}
        id='menu_collections'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        <LibraryBig />
        My Collections
      </NavLink>
      <NavLink
        to={`/user/${user.username}`}
        id='menu_profile'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        <UserPen />
        View Profile
      </NavLink>
    </div>
  );
};

export default SideBarNav;
