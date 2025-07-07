import { Sequelize } from "sequelize-typescript";
import { Student } from "./student";
import { School } from "./school";
import { DocumentRequest } from "./document_request";
import { Payment } from "./payment";
import { Document } from "./document";
import { Verification } from "./verification";
import { SupportTicket } from "./support_ticket";
import { AuditLog } from "./audit_log";
import { AppConfig } from "./app_config";
import { DocumentType } from "./document_type";
import { SchoolAdmin } from "./school_admin";
import { SuperAdmin } from "./super_admin";
import { PendingVerification } from "./pending_verification";

// Update these values with your actual database credentials
let sequelize: Sequelize;
try {
  sequelize = new Sequelize({
    database: process.env.DB_NAME || "unidocs",
    dialect: "postgres",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "123456",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    models: [
      Student,
      School,
      SchoolAdmin,
      SuperAdmin,
      DocumentRequest,
      Payment,
      Document,
      Verification,
      SupportTicket,
      AuditLog,
      AppConfig,
      DocumentType,
      PendingVerification,
    ],
  });

  // Define associations after all models are registered
  School.hasMany(Student, { foreignKey: "school_id", as: "students" });
  Student.belongsTo(School, { foreignKey: "school_id", as: "school" });

  School.hasMany(SchoolAdmin, { foreignKey: "school_id", as: "admins" });
  SchoolAdmin.belongsTo(School, { foreignKey: "school_id", as: "adminSchool" });

  sequelize.options.logging = false; // set to true for debugging
} catch (error) {
  console.error("Failed to initialize Sequelize instance:", error);
  throw error;
}

export {
  sequelize,
  Student,
  School,
  SchoolAdmin,
  SuperAdmin,
  DocumentRequest,
  Payment,
  Document,
  Verification,
  SupportTicket,
  AuditLog,
  AppConfig,
  DocumentType,
};
