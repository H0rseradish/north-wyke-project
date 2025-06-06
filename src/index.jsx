import { StrictMode } from 'react';
import './style.css';
import { createRoot } from 'react-dom/client';
import Experience from './Experience';

const root = createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        <Experience />
    </StrictMode>
)