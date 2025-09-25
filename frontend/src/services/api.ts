import axios from 'axios';
import { CarRequestDto, CarResponseDto } from '../types';

const API_URL = 'http://localhost:5000/api/car';

export const fetchCars = async (): Promise<CarResponseDto[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addCar = async (carData: CarRequestDto): Promise<CarResponseDto> => {
    const response = await axios.post(API_URL, carData);
    return response.data;
};

export const fetchCarByRegistrationNumber = async (registrationNumber: string): Promise<CarResponseDto> => {
    const response = await axios.get(`${API_URL}/${registrationNumber}`);
    return response.data;
};

export const verifyCarPayment = async (
    year: number,
    registrationNumber: string,
    energyType: string,
    fiscalPower: number
): Promise<CarResponseDto> => {
    const response = await axios.get(`${API_URL}/verify`, {
        params: {
            year,
            registrationNumber,
            energyType,
            fiscalPower
        }
    });
    return response.data;
};