import bcrypt from "bcrypt";
import { SuperAdmin } from "../../models/super_admin";

export async function bootstrapSuperAdmin() {
  try {
    const username = process.env.SUPER_ADMIN_USERNAME;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const email = process.env.SUPER_ADMIN_EMAIL;

    if (!username || !password || !email) return;

    const existing = await SuperAdmin.findOne({ where: { username } });
    if (existing) return;

    const hashed = await bcrypt.hash(password, 10);
    await SuperAdmin.create({ username, password: hashed, email });

    console.log("✅ Super admin bootstrapped.");
  } catch (error) {
    console.error("❌ Failed to bootstrap super admin:", error);
  }
}
