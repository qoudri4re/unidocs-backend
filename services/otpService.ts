export async function generateOtp(length = 6): Promise<string> {
  // generate numeric OTP string of given length
  const characters = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  // use email provider SDK or SMTP to send OTP
  console.log(`Sending OTP ${otp} to email ${email}`);
}

export async function sendOtpSms(phone: string, otp: string): Promise<void> {
  // use SMS provider API to send OTP
  console.log(`Sending OTP ${otp} to phone ${phone}`);
}
