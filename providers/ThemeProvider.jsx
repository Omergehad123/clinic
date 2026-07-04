"use client";

import { ThemeProvider } from "next-themes";
import QueryProvider from "./QueryProvider";

export default function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <QueryProvider>
                {children}
            </QueryProvider>
        </ThemeProvider>
    );
}