import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Made by{" "}
            <Link
              href="/about-creator"
              className="font-semibold text-foreground hover:text-primary transition-colors underline"
            >
              Kasra Bozorgmehr
            </Link>
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about-monte-carlo" className="hover:text-primary transition-colors">
              About Monte Carlo
            </Link>
            <Link href="/about-creator" className="hover:text-primary transition-colors">
              About Creator
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
