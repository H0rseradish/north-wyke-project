import './style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';

import Experience from './Experience';
import PetesApp from './PetesApp';
import ExperienceExercise from './ExperienceExercise';
import Fields from './Fields';


const root = createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        <Canvas>
            <Fields />
        </Canvas>
        
            <PetesApp />
    </StrictMode>
)