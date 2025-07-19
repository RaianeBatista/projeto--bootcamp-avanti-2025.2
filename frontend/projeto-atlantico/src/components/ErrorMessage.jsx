import React from 'react';

const ErrorMessage = ({ 
    message = 'Ocorreu um erro inesperado', 
    onRetry = null,
    type = 'danger' 
}) => {
    return (
        <div className={`alert alert-${type} d-flex align-items-center`} role="alert">
            <div className="me-2">
                {type === 'danger' && <i className="bi bi-exclamation-triangle-fill"></i>}
                {type === 'warning' && <i className="bi bi-exclamation-triangle"></i>}
                {type === 'info' && <i className="bi bi-info-circle-fill"></i>}
            </div>
            <div className="flex-grow-1">
                {message}
            </div>
            {onRetry && (
                <button 
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={onRetry}
                >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Tentar novamente
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
