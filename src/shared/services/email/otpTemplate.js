export const otpTemplate = (otp, message = 'Use the following OTP to proceed:') => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Your OTP Code</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">Your One-Time Password</h2>
        <p style="font-size: 16px;">${message}</p>
        <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
        <p style="font-size: 14px; color: #666;">If you did not request this, please ignore this email.</p>
        <hr style="margin-top: 30px;" />
        <p style="font-size: 12px; color: #aaa;">Geekofy • This is an automated email, please do not reply.</p>
      </div>
    </body>
  </html>
`;


