import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const BookCard = ({ title, author, cover, description, authorInfo }) => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [openExchangeModal, setOpenExchangeModal] = useState(false);

    const handleOpenDetails = () => setOpenDetailsModal(true);
    const handleCloseDetails = () => setOpenDetailsModal(false);

    const handleOpenExchange = () => {
        setOpenExchangeModal(true);
    };
    const handleCloseExchange = () => setOpenExchangeModal(false);

    return (
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', margin: '10px', width: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={cover} alt={title} style={{ width: '128px', height: 'auto', marginBottom: '10px' }} />
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{title}</h2>
            <p style={{ marginBottom: '10px', fontStyle: 'italic' }}>{author}</p>
            <p style={{ marginBottom: '10px' }}>{description.substring(0, 100)}...</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <Button variant="contained" color="primary" onClick={handleOpenDetails} style={{ backgroundColor: '#1976d2' }}>
                    Открыть
                </Button>
                <Button variant="contained" color="secondary" onClick={handleOpenExchange} style={{ backgroundColor: '#2e7d32' }}>
                    Взять книгу
                </Button>
            </div>
            <Dialog open={openDetailsModal} onClose={handleCloseDetails}>
                <DialogTitle>Информация о книге</DialogTitle>
                <DialogContent>
                    <h2>{title}</h2>
                    <p>{author}</p>
                    <p>{description}</p>
                    <p>Информация об авторе объявления: {authorInfo}</p>
                    {/* Здесь можно добавить дополнительную информацию об авторе объявления и способы связи */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails}>Закрыть</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openExchangeModal} onClose={handleCloseExchange}>
                <DialogTitle>Предложить книгу в обмен</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Телефон"
                        type="tel"
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        margin="dense"
                        id="comment"
                        label="Комментарии"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseExchange}>Отмена</Button>
                    <Button onClick={handleCloseExchange} color="primary" variant="contained">Предложить книгу в обмен</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BookCard;
