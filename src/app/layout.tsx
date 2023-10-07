import { Providers } from "@/components/providers/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "./components/header";

const inter = Inter({ weight: ["400", "500", "700"], subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
	title: "General",
	description: "Generated by create next app",
	icons: {
		icon: "/favicon.ico"
	}
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(inter.className, "font-medium")}>
				<Providers
					refetchOnWindowFocus={true}
					refetchWhenOffline={false}
					refetchInterval={Number(process.env.NEXT_PUBLIC_JWT_EXPIRES) / 2}
					session={session}
				>
					<div className='wrapper flex min-h-screen flex-col overflow-hidden'>
						<Header />
						<main className='flex flex-auto flex-col pt-20'>{children}</main>
					</div>
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}