import './style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { GeojsonProvider } from './geojsonProvider';


import PetesApp from './PetesApp';

import Fields from './Fields';
import FieldsNames from './FieldsNames';


const root = createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        <GeojsonProvider>

            <Canvas>
                <Fields />
                
            </Canvas>
            <FieldsNames />
            <PetesApp />

        </GeojsonProvider>
    </StrictMode>
)