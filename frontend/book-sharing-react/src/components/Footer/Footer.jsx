import React from 'react';

function Footer() {
    return (
        <footer style={{ padding: '20px', backgroundColor: '#f5f5f5', boxShadow: '0 -2px 4px rgba(0,0,0,0.1)', marginTop: 'auto', textAlign: 'center' }}>
            <p>BookSharing &copy; {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer;
