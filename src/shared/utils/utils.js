import crypto from 'crypto'

export const generateOTP = ()=>{
    const digit = '0123456789';
    let OTP ="";
    for(let i=0; i< 6; i++){
        OTP += digit.charAt(Math.floor(Math.random() * 10));
    }
    return OTP;
}

export function generateFileName(fileName) {
    return `${crypto.randomBytes(16).toString('hex')}-${fileName}`;
}
