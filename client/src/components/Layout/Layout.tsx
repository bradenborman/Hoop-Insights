import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ContentArea from '../ContentArea/ContentArea';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <ContentArea>{children}</ContentArea>
        </div>
    );
};

export default Layout;
