import React from 'react';
import { useHistory } from 'react-router-dom';

const HomePage: React.FC = () => {
    const history = useHistory();

    return (
        <div className="page-container">
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '30px',
                    fontWeight: 500,
                    marginTop: '-40px'
                }}>
                    Welcome to the Road Tax System!
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    marginBottom: '50px',
                    color: '#e0e0e0'
                }}>
                    This app allows you to quickly and easily check and print your vehicle's attestation. 
                    Simply enter your car's details, and we'll retrieve the necessary information from our database. 
                    Once verified, you can generate and print your attestation in PDF format.
                </p>

                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '30px',
                    fontWeight: 600,
                    color: '#ffffff'
                }}>
                    Road Tax Table
                </h2>

                <div className="tax-table-container">
                    <table className="tax-table">
                        <thead>
                            <tr>
                                <th>Fiscal Power</th>
                                <th>Gasoline</th>
                                <th>Diesel</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Less than 8 HP</td>
                                <td>350 MAD</td>
                                <td>700 MAD</td>
                            </tr>
                            <tr>
                                <td>8 HP - 10 HP</td>
                                <td>650 MAD</td>
                                <td>1,500 MAD</td>
                            </tr>
                            <tr>
                                <td>11 HP - 14 HP</td>
                                <td>3,000 MAD</td>
                                <td>6,000 MAD</td>
                            </tr>
                            <tr>
                                <td>15 HP and above</td>
                                <td>8,000 MAD</td>
                                <td>20,000 MAD</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p style={{
                    marginTop: '50px',
                    marginBottom: '20px',
                    color: '#e0e0e0',
                    fontSize: '1.1rem'
                }}>
                    To get started, click the button below:
                </p>
                <button 
                    onClick={() => history.push('/car-form')}
                    className="attestation-button"
                >
                    Check and Print Your Attestation
                </button>
            </div>
        </div>
    );
};

export default HomePage;