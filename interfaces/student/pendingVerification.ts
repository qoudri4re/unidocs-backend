export interface PendingVerificationAttributes {
  contact_value: string;
  otp: string;
  expires_at: Date;
  user_payload: {
    full_name: string;
    email: string;
    phone_number: string;
    preferred_verification_channel: "email" | "phone";
  };
}

export interface PendingVerificationCreationAttributes {}
