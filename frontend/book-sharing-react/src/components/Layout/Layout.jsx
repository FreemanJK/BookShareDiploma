import React from 'react';

const Layout = ({ children }) => {
    return (
        <div style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
        }}>
            <main style={{flex: '1'}}>
                {children}
            </main>

        </div>
);
}

export default Layout;
