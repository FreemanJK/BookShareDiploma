import React, { useState } from 'react';
import BookList from "../components/dashboard/dashboard";
import Layout from "../components/Layout/Layout";
import Button from "@mui/material/Button";
import MyBooks from "../components/MyBooks/MyBooks";

function HomePage() {
    const [activeTab, setActiveTab] = useState('feed');

    return (
        <Layout>
            <div style={{padding: '20px'}}>
                <h1>Главная страница</h1>
                <nav style={{marginBottom: '20px', display: 'flex', gap: '10px'}}>
                    <Button
                        variant="outlined"
                        onClick={() => setActiveTab('profile')}
                        style={{textTransform: 'none', borderRadius: '20px'}}
                    >
                        Мой профиль
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setActiveTab('feed')}
                        style={{textTransform: 'none', borderRadius: '20px'}}
                    >
                        Лента книг
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setActiveTab('myBooks')}
                        style={{textTransform: 'none', borderRadius: '20px'}}
                    >
                        Мои книги
                    </Button>
                </nav>
                <div>
                    {activeTab === 'profile' && <div>Здесь будет информация о профиле пользователя</div>}
                    {activeTab === 'feed' && <BookList/>}
                    {activeTab === 'myBooks' && <MyBooks />}
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;
