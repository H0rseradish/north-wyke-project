import './css/style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { GeojsonProvider } from './utils/geojsonProvider';


import PetesApp from './PetesApp';
import App from './App';


const root = createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        <GeojsonProvider>
            <App />
            <PetesApp />
        </GeojsonProvider>
    </StrictMode>
)