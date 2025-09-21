import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    NEXT_PUBLIC_ADMIN_PASSWORD:'yourSecretPassword'
  }
};

export default nextConfig;
