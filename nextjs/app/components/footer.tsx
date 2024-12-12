import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

/**
 * Footer Component
 * Renders the application's footer section with project information and theme switcher
 *
 * Features:
 * - Displays project attribution and GitHub link
 * - Includes theme switcher functionality
 * - Responsive design with different padding for mobile/desktop
 * - Styled using Tailwind CSS
 */
export default function Footer() {
  return (
    <footer className="border-t w-full">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-sm leading-loose">
            Built by DeltaSquad . The source code is available on{" "}
            <Link
              href="https://github.com/codesport/blockchain-lottery/?tab=readme-ov-file"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex justify-center w-full">
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
