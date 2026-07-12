import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.MONGO_DB_URI;
if (!mongoUri) {
  throw new Error("MONGO_DB_URI is not defined in the environment variables.");
}

const client = new MongoClient(mongoUri);
const db = client.db(process.env.AUTH_DB_NAME || "Craft_Nest");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    usePlural: true,
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID || "", 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", 
    }, 
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user"
      },
      plan: {
        type: "string",
        defaultValue: "user"
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false
      },
      isPremium: {
        type: "boolean",
        defaultValue: false
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 24 * 30,
    },
  },
  plugins: [
    jwt()
  ]
});
