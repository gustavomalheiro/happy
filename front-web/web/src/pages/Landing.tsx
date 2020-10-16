import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg'; // sempre é necessário colocar o ./ quando formos procurar pastas

function Landing() {
    return (
        <div id="page-landing">
        <div className="content-wrapper">
            <img src={logoImg} alt="Happy"/> 

            <main>
                <h1>Leve felicidade para o mundo</h1>
                <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>
          
            <div className="location"> 
                <strong>São Bernardo do Campo</strong>
                <span>São Paulo</span>
            </div>

            <Link to="/app" className="enter-app"> { /* utilizando o Link to ao invés do href, conseguimos fazer com que não tenha recarregamentos desnecessários (economia de bytes)*/}
                <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
            </Link>
        </div>
    </div>
    );
}

export default Landing;