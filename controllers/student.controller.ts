import { Request, Response } from "express";
import { Student } from "../models";
import { Op } from "sequelize";
import { generateOtp, sendOtpEmail, sendOtpSms } from "../services/otpService";
import { PendingVerificationCreationAttributes } from "../interfaces/student/pendingVerification";
import { PendingVerification } from "../models/pending_verification";
import { handleApiError } from "../utils/error-handler";
import {
  hashPassword,
  generateToken,
  comparePassword,
} from "../services/authService";
import { AuthenticatedRequest } from "../types/custom";

export async function initiateStudentSignup(req: Request, res: Response) {
  try {
    const { full_name, email, phone_number, verification_channel } = req.body;

    const existingUser = await Student.findOne({
      where: {
        [Op.or]: [{ email }, { phone_number }],
      },
    });

    if (!existingUser) {
      const contact_value =
        verification_channel === "email" ? email : phone_number;

      const existingVerification = await PendingVerification.findOne({
        where: {
          contact_value,
        },
      });

      if (existingVerification) {
        if (existingVerification.expires_at > new Date()) {
          res.status(400).json({ success: false, message: "OTP already sent" });
          return;
        }
        //update it with new otp
        const otp = await generateOtp();
        await existingVerification.update({
          otp,
          expires_at: new Date(Date.now() + 60 * 60 * 1000),
        });
        let response = "";

        if (verification_channel === "email") {
          await sendOtpEmail(email, otp);
          response = "OTP sent to mail";
        } else if (verification_channel === "phone") {
          await sendOtpSms(phone_number, otp);
          response = "OTP sent to phone";
        }

        res.status(201).json({ success: true, message: response });
        return;
      }

      const otp = await generateOtp();
      let response = "";

      if (verification_channel === "email") {
        await sendOtpEmail(email, otp);
        response = "OTP sent to mail";
      } else if (verification_channel === "phone") {
        await sendOtpSms(phone_number, otp);
        response = "OTP sent to phone";
      }

      let data: PendingVerificationCreationAttributes = {
        contact_value,
        otp,
        expires_at: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        user_payload: {
          full_name,
          email,
          phone_number,
          preferred_verification_channel: verification_channel,
        },
      };
      await PendingVerification.create(data);
      res.status(201).json({ success: true, message: response });
      return;
    } else {
      let messages: string[] = [];
      if (existingUser.email === email) {
        messages.push("Email already exists");
      }
      if (existingUser.phone_number === phone_number) {
        messages.push("Phone number already exists");
      }
      res.status(400).json({ success: false, message: messages.join(", ") });
    }
  } catch (error: any) {
    handleApiError(error, res);
  }
}

export async function verifyOtp(req: Request, res: Response): Promise<void> {
  try {
    const { contact_value, otp } = req.body;

    const pendingVerification = await PendingVerification.findOne({
      where: { contact_value, otp },
    });
    if (!pendingVerification) {
      res.status(400).json({ success: false, message: "Invalid OTP" });
      return;
    }
    if (pendingVerification.expires_at < new Date()) {
      res.status(400).json({ success: false, message: "OTP expired" });
      return;
    }
    await pendingVerification.update({ verified: true });
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
    return;
  } catch (error) {
    handleApiError(error, res);
  }
}

export async function registerStudent(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { contact_value, password } = req.body;

    const verifiedUser = await PendingVerification.findOne({
      where: { contact_value },
    });

    if (!verifiedUser || !verifiedUser.verified) {
      console.log("User not verified");
      res.status(403).json({
        success: false,

        //keep hackers guessing
        message: "Something went wrong. Please try again.",
        //message: "OTP verification required before completing registration.",
      });
      return;
    }

    const user = await Student.create({
      full_name: verifiedUser.user_payload.full_name,
      email: verifiedUser.user_payload.email,
      phone_number: verifiedUser.user_payload.phone_number,
      password: await hashPassword(password),
    });
    await verifiedUser.destroy();
    const token = await generateToken({ id: user.id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    handleApiError(error, res);
  }
}

export async function loginStudent(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await Student.scope("withPassword").findOne({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });

      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });

      return;
    }

    const token = await generateToken({ id: user.id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    handleApiError(error, res);
  }
}

export async function logoutStudent(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
}

export async function getStudentProfile(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const user = await Student.scope("forStudent").findByPk(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleApiError(error, res);
  }
}

export async function updateStudentProfile(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const userId = req.user?.id;

  try {
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const user = await Student.findByPk(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const {
      full_name,
      matric_number,
      graduation_year,
      program,
      department,
      school_id,
    } = req.body;

    await user.update({
      full_name,
      matric_number,
      graduation_year,
      program,
      department,
      school_id: school_id === "" ? null : school_id,
    });

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    handleApiError(error, res);
  }
}
