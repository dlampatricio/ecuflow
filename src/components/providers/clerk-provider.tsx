"use client";

import { ClerkProvider as ClerkProviderBase } from "@clerk/nextjs";
import { type ReactNode } from "react";

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProviderBase>{children}</ClerkProviderBase>
  );
}