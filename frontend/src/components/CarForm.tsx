import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { addCar, verifyCarPayment } from '../services/api';
import { CarRequestDto } from '../types';

const CarForm: React.FC = () => {
    const history = useHistory();
    const [year, setYear] = useState<number | ''>('');
    const [registrationNumber, setRegistrationNumber] = useState<string>('');
    const [registrationPart1, setRegistrationPart1] = useState<string>('');
    const [registrationPart2, setRegistrationPart2] = useState<string>('');
    const [registrationPart3, setRegistrationPart3] = useState<string>('');
    const [energyType, setEnergyType] = useState<'Diesel' | 'Gasoline'>('Diesel');
    const [fiscalPower, setFiscalPower] = useState<number | ''>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setRegistrationNumber(
            `${registrationPart1}-${registrationPart2}-${registrationPart3}`
        );
    }, [registrationPart1, registrationPart2, registrationPart3]);

    
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleEnergyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'Diesel' || value === 'Gasoline') {
            setEnergyType(value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (year && registrationNumber && fiscalPower) {
            try {
                const result = await verifyCarPayment(
                    Number(year),
                    registrationNumber,
                    energyType,
                    Number(fiscalPower)
                );
                
                history.push('/verification-result', { 
                    verificationData: result 
                });
            } catch (error) {
                setError('No car with such details was found!');
            }
        }
    };

    return (
        <div className="page-container">
            {error && (
                <div className="error-dialog">
                    <AlertCircle size={20} />
                    <span>No car with such details was found!</span>
                </div>
            )}
            <div className="form-container">
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '10px',
                    fontWeight: 500,
                    color: '#ffffff'
                }}>
                    Car Information Form
                </h1>
                <p style={{
                    color: '#9e9e9e',
                    fontSize: '1.1rem',
                    marginBottom: '30px'
                }}>
                    Input your car information!
                </p>
                <form onSubmit={handleSubmit} className="car-form">
                    <div className="form-group">
                        <div className="form-row">
                            <label>Fiscal Year</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={year}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value === '') {
                                        setYear('');
                                    } else {
                                        const numValue = parseInt(value);
                                        if (numValue >= 0 && numValue <= 2025) {
                                            setYear(numValue);
                                        }
                                    }
                                }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                pattern="[0-9]{4}"
                                required
                                className="form-input"
                                style={{ 
                                    width: '120px',
                                    fontSize: '16px'
                                }}
                                maxLength={4}
                                placeholder="2025"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label>Registration Number</label>
                            <div className="registration-inputs" style={{ width: 'auto' }}>
                                <input
                                    type="text"
                                    value={registrationPart1}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        if (value.length <= 5) {
                                            setRegistrationPart1(value);
                                        }
                                    }}
                                    maxLength={5}
                                    pattern="[1-9][0-9]{0,4}"
                                    required
                                    className="form-input reg-part"
                                    placeholder="12345"
                                    style={{ width: '80px' }}
                                />
                                <span className="separator">-</span>
                                <input
                                    type="text"
                                    value={registrationPart2}
                                    onChange={(e) => {
                                        const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
                                        if (value.length <= 1) {
                                            setRegistrationPart2(value);
                                        }
                                    }}
                                    maxLength={1}
                                    pattern="[A-Z]"
                                    required
                                    className="form-input reg-part"
                                    placeholder="A"
                                    style={{ width: '40px' }}
                                />
                                <span className="separator">-</span>
                                <input
                                    type="text"
                                    value={registrationPart3}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        if (value.length <= 2 && parseInt(value) <= 99) {
                                            setRegistrationPart3(value);
                                        }
                                    }}
                                    maxLength={2}
                                    pattern="[1-9][0-9]?"
                                    required
                                    className="form-input reg-part"
                                    placeholder="12"
                                    style={{ width: '50px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label>Energy Type</label>
                            <div className="select-wrapper" style={{ width: '120px' }}>
                                <select
                                    value={energyType}
                                    onChange={handleEnergyTypeChange}
                                    required
                                    className="form-input"
                                >
                                    <option value="Diesel">Diesel</option>
                                    <option value="Gasoline">Gasoline</option>
                                </select>
                                <ChevronDown size={20} className="select-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label>Fiscal Power</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="text"
                                    value={fiscalPower}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                                        if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 99)) {
                                            setFiscalPower(value === '' ? '' : parseInt(value));
                                        }
                                    }}
                                    required
                                    pattern="[0-9]{1,2}"
                                    className="form-input"
                                    style={{ width: '60px' }}
                                    maxLength={2}
                                    placeholder="8"
                                />
                                <span style={{ color: '#e0e0e0' }}>hp</span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="attestation-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CarForm;