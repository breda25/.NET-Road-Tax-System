import React from 'react';

interface CarDetailsProps {
    year: number;
    registrationNumber: string;
    energyType: 'Diesel' | 'Gasoline';
    fiscalPower: number;
   dateOfFirstRegistration: Date;
}

const CarDetails: React.FC<CarDetailsProps> = ({ year, registrationNumber, energyType, fiscalPower,dateOfFirstRegistration }) => {
    const handlePrint = () => {
        
    };

    return (
        <div>
            <h2>Car Details</h2>
            <p><strong>Year:</strong> {year}</p>
            <p><strong>Registration Number:</strong> {registrationNumber}</p>
            <p><strong>Energy Type:</strong> {energyType}</p>
            <p><strong>Fiscal Power:</strong> {fiscalPower}</p>
            <p><strong>First Circulation Date:</strong> {dateOfFirstRegistration.toDateString()}</p>
            <button onClick={handlePrint}>Print Attestation</button>
        </div>
    );
};

export default CarDetails;