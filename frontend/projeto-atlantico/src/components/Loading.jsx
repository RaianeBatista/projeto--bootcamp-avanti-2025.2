import React from 'react';

const Loading = ({ message = 'Carregando...', size = 'normal' }) => {
    const spinnerClass = size === 'small' ? 'spinner-border-sm' : '';
    
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className={`spinner-border text-primary ${spinnerClass}`} role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-muted">{message}</p>
        </div>
    );
};

export default Loading;
