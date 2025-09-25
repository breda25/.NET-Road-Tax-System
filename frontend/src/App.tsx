import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CarForm from './components/CarForm';
import CarDetails from './components/CarDetails';
import VerificationResult from './components/VerificationResult';



const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/car-form" component={CarForm} />
                <Route path="/car-details/:registrationNumber" component={CarDetails} />
                <Route path="/verification-result" component={VerificationResult} />
            </Switch>
        </Router>
    );
};

export default App;