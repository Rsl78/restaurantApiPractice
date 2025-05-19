import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./Router/Router";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/primereact.css";
import "./styles/demo/Demos.scss"
import "./styles/layout/layout.scss";
import GlobalProvider from "./GlobalProvider/GlobalProvider";


function App() {
    return (
        <div>
            <PrimeReactProvider>
                <GlobalProvider>
                    <RouterProvider router={router}/>
                </GlobalProvider>
            </PrimeReactProvider>

        </div>
    );
}

export default App;
