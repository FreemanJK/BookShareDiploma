import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "auto 0 ",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <h1>BookSharing</h1>
                <nav>
                    <Link to="/main" style={{marginRight: '20px'}}>Главная</Link>
                    <Link to="/profile">Профиль</Link>
                </nav>
            </div>

        </header>
    );
}

export default Header;
