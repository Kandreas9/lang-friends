"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "./components/header";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/x-icon" href="logo.png" />
            </head>
            <body className="flex flex-col">
                <SessionProvider>
                    <Header></Header>

                    <main className="max-w-[1440px] mx-auto w-full p-[20px] h-[calc(100vh-100px)]">
                        {children}
                    </main>

                    <div id="modal"></div>
                </SessionProvider>
            </body>
        </html>
    );
}
