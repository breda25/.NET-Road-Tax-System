import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Check } from 'react-feather';
import { CarResponseDto } from '../types';
import jsPDF from 'jspdf';

const NORMAL_FONT = "normal";
const BOLD_FONT = "bold";
const BASE_FONT_SIZE = 12;

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).split('-').join('/');
};

const formatAmount = (amount: number): string => {
    return `${amount.toFixed(2).replace('.', ',')} MAD`;
};

const VerificationResult: React.FC = () => {
    const history = useHistory();
    const location = useLocation<{ verificationData: CarResponseDto }>();
    const carData = location.state?.verificationData;

    if (!carData) {
        history.push('/car-form');
        return null;
    }

    const formattedDate = carData.dateOfFirstRegistration ? 
        formatDate(carData.dateOfFirstRegistration)
        : '';

    const generatePDF = async () => {
        try {
            
            const doc = new jsPDF({
                unit: 'mm',
                format: 'a4',
            });

            
            const regularFontUrl = `${process.env.PUBLIC_URL}/fonts/BaiJamjuree-Regular.ttf`;
            const boldFontUrl = `${process.env.PUBLIC_URL}/fonts/BaiJamjuree-Bold.ttf`;

            try {
                
                const [regularFontResponse, boldFontResponse] = await Promise.all([
                    fetch(regularFontUrl),
                    fetch(boldFontUrl)
                ]);

                const [regularFontArrayBuffer, boldFontArrayBuffer] = await Promise.all([
                    regularFontResponse.arrayBuffer(),
                    boldFontResponse.arrayBuffer()
                ]);

                
                const regularFontBase64 = arrayBufferToBase64(regularFontArrayBuffer);
                const boldFontBase64 = arrayBufferToBase64(boldFontArrayBuffer);

                
                doc.addFileToVFS('BaiJamjuree-Regular.ttf', regularFontBase64);
                doc.addFileToVFS('BaiJamjuree-Bold.ttf', boldFontBase64);
                doc.addFont('BaiJamjuree-Regular.ttf', 'BaiJamjuree', 'normal');
                doc.addFont('BaiJamjuree-Bold.ttf', 'BaiJamjuree', 'bold');

                
                doc.setFont('BaiJamjuree', 'normal');

                
            } catch (fontError) {
                console.error('Error loading fonts:', fontError);
                
                doc.setFont('helvetica', 'normal');
            }

            
            doc.setFillColor(18, 18, 18);
            doc.rect(0, 0, doc.internal.pageSize.width, 70, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(28);
            doc.setFont('BaiJamjuree', BOLD_FONT);
            doc.text('Road Tax Authority', doc.internal.pageSize.width / 2, 25, { align: 'center' });
            
            doc.setFontSize(20);
            doc.text('Road Tax Attestation', doc.internal.pageSize.width / 2, 40, { align: 'center' });
            
            doc.setFontSize(16);
            doc.text(`Year ${carData.year}`, doc.internal.pageSize.width / 2, 55, { align: 'center' });

            
            doc.setTextColor(18, 18, 18);
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(20, 80, doc.internal.pageSize.width - 40, 80, 3, 3, 'F');
            
            doc.setFontSize(16);
            doc.setFont('BaiJamjuree', BOLD_FONT);
            doc.text('Vehicle Information', 30, 95);

            doc.setFontSize(BASE_FONT_SIZE);
            doc.setFont('BaiJamjuree', NORMAL_FONT);
            const vehicleInfo = [
                { label: 'Fiscal Year', value: carData.year },
                { label: 'Vehicle Model', value: carData.vehicleModel },
                { label: 'Registration Number', value: carData.registrationNumber },
                { label: 'Energy Type', value: carData.energyType },
                { label: 'Fiscal Power', value: `${carData.fiscalPower} hp` },
                { label: 'Date Of First Registration', value: formattedDate }
            ];

            let vehicleYPos = 110;
            vehicleInfo.forEach(info => {
                doc.setFont('BaiJamjuree', BOLD_FONT);
                doc.text(`${info.label}:`, 30, vehicleYPos);
                doc.setFont('BaiJamjuree', NORMAL_FONT);
                doc.text(info.value.toString(), 120, vehicleYPos);
                vehicleYPos += 8;
            });

            
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(20, 170, doc.internal.pageSize.width - 40, 50, 3, 3, 'F');

            
            doc.setFont('BaiJamjuree', BOLD_FONT);
            doc.setFontSize(16);
            doc.text('Payment Information', 30, 180); 

            
            const boxHeight = 50;
            const titleHeight = 16; 
            const contentHeight = 8 * 3; 
            const totalSpace = boxHeight - titleHeight;
            const spaceBetweenTitleAndContent = 6; 
            const remainingSpace = totalSpace - contentHeight - spaceBetweenTitleAndContent;
            const bottomPadding = remainingSpace / 2;

            
            doc.setFontSize(BASE_FONT_SIZE);
            doc.setFont('BaiJamjuree', NORMAL_FONT);
            const paymentInfo = [
                { label: 'Transaction ID', value: carData.transactionId },
                { label: 'Road Tax Amount', value: formatAmount(carData.roadTaxAmount) },
                { label: 'Transaction Date', value: formatDate(carData.transactionDate) }
            ];

            let paymentYPos = 170 + titleHeight + spaceBetweenTitleAndContent + bottomPadding;
            paymentInfo.forEach(info => {
                doc.setFont('BaiJamjuree', BOLD_FONT);
                doc.text(`${info.label}:`, 30, paymentYPos);
                doc.setFont('BaiJamjuree', NORMAL_FONT);
                doc.text(info.value.toString(), 120, paymentYPos);
                paymentYPos += 8;
            });

            
            doc.setFillColor(18, 18, 18);
            doc.rect(0, doc.internal.pageSize.height - 30, doc.internal.pageSize.width, 30, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFont('BaiJamjuree', NORMAL_FONT);
            doc.setFontSize(10);
            const currentYear = new Date().getFullYear();
            doc.text(
                `Road Tax Authority © ${currentYear}`,
                doc.internal.pageSize.width / 2,
                doc.internal.pageSize.height - 15,
                { align: 'center' }
            );

            
            const fileName = `${carData.registrationNumber} (${carData.year}).pdf`;
            doc.save(fileName);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '15px',
                    marginBottom: '30px' 
                }}>
                    <Check size={32} color="white" style={{ fontWeight: 'bold' }} />
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: 0
                    }}>
                        Payment verified!
                    </h1>
                </div>

                <form className="car-form">
                    <div className="form-group">
                        <div className="form-row">
                            <label>Fiscal Year</label>
                            <input
                                type="text"
                                value={carData.year}
                                className="form-input"
                                style={{ width: '120px' }}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label>Vehicle Model</label>
                            <input
                                type="text"
                                value={carData.vehicleModel}
                                className="form-input"
                                style={{ width: '300px' }}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label>Registration Number</label>
                            <input
                                type="text"
                                value={carData.registrationNumber}
                                className="form-input"
                                style={{ width: '200px' }}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label>Energy Type</label>
                            <input
                                type="text"
                                value={carData.energyType}
                                className="form-input"
                                style={{ width: '120px' }}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label>Fiscal Power</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="text"
                                    value={carData.fiscalPower}
                                    className="form-input"
                                    style={{ width: '60px' }}
                                    readOnly
                                />
                                <span style={{ color: '#e0e0e0' }}>hp</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label>Date Of First Registration</label>
                            <input
                                type="text"
                                value={formattedDate}
                                className="form-input"
                                style={{ width: '200px' }}
                                readOnly
                            />
                        </div>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        gap: '20px',
                        justifyContent: 'center',
                        marginTop: '30px',
                        flexWrap: 'wrap'
                    }}>
                        <button 
                            type="button"
                            className="attestation-button"
                            onClick={() => history.push('/car-form')}
                        >
                            Check Another Car
                        </button>
                        <button 
                            type="button"
                            className="attestation-button"
                            onClick={generatePDF}
                        >
                            Print Attestation
                        </button>
                        <button 
                            type="button"
                            className="attestation-button"
                            onClick={() => history.push('/')}
                        >
                            Back to Home
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerificationResult;