namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_SUPABASE_SECRET_KEY: string;
    CLOUDINARY_APP_NAME: string;
    CLOUDINARY_APP_KEY: string;
    CLOUDINARY_APP_SECRET: string;
    RESEND_KEY: string;
    RESEND_DOMAIN: string;
    RESEND_EMAIL: string;
    ADMIN_EMAIL?: string;
    GALLERY_MANIFEST_PASSWORD?: string;
    NEXT_PUBLIC_SITE_URL?: string;
  }
}
