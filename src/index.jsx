import './style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { GeojsonProvider } from './geojsonProvider';


import PetesApp from './PetesApp';
import FieldsNames from './FieldsNames';
import Experience from './Experience';
import Timeline from './Timeline';


const root = createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        <GeojsonProvider>

            <Canvas>
                <Experience />
            </Canvas>

            <Timeline />
            <FieldsNames />
            <PetesApp />
        </GeojsonProvider>
    </StrictMode>
)