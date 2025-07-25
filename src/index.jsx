import './css/style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import { GeojsonProvider } from './utils/geojsonProvider';
import { JsonProvider } from './utils/jsonProvider';

// import PetesApp from './PetesApp';
import App from './App';


const root = createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        {/* trying my new more reusable JsonProvider instead of GeojsonProvider.. */}
        <JsonProvider>
            <App />
            {/* <PetesApp /> */}
        </JsonProvider>
    </StrictMode>
)