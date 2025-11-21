import './index.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SideBarNav from '../main/sideBarNav';
import RightSidebar from '../rightSidebar';
import Header from '../header';
import Footer from '../footer';
import AdBlockerModal from '../adBlockerModal';
import { detectAdBlockCombined } from '../../utils/adBlockDetector';

/**
 * Main component represents the layout of the main page, including a sidebar and the main content area.
 */
const Layout = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkAdBlock = async () => {
      const isBlocked = await detectAdBlockCombined();

      if (isBlocked) {
        setShowModal(true);
      }
    };

    checkAdBlock();
  }, []);

  const handleDismiss = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div id='main' className='main'>
        <SideBarNav />
        <div id='right_main' className='right_main'>
          <Outlet />
        </div>
        <RightSidebar />
      </div>
      <Footer />
      <AdBlockerModal isVisible={showModal} onDismiss={handleDismiss} />
    </>
  );
};

export default Layout;
