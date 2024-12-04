import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="flex flex-col items-center gap-4 max-w-[80ch]">
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
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
