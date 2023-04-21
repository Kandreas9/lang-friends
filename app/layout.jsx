"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "./components/header";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="robots" content="noindex,nofollow" />
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
