import "./globals.css";
import { Providers } from "@/app/provider";
import Appbar from "@/components/Appbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Appbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}