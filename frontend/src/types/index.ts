export interface Car {
    id: number;
    year: number;
    registrationNumber: string;
    energyType: 'Diesel' | 'Gasoline';
    fiscalPower: number;
   dateOfFirstRegistration: Date;
}

export interface CarRequestDto {
    year: number;
    registrationNumber: string;
    energyType: string;
    fiscalPower: number;
    dateOfFirstRegistration: Date;
    vehicleModel: string;
}

export interface CarResponseDto {
    id: number;
    year: number;
    registrationNumber: string;
    energyType: string;
    fiscalPower: number;
    dateOfFirstRegistration: string;
    vehicleModel: string;
    transactionId: string;
    roadTaxAmount: number;
    transactionDate: string;
}