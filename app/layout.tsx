import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Theme boot: read saved colors and set CSS vars early */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var saved = JSON.parse(localStorage.getItem('cyberheroes:theme') || '{}');
              var root = document.documentElement;
              if (saved.header) root.style.setProperty('--brand-header', saved.header);
              if (saved.from) root.style.setProperty('--brand-from', saved.from);
              if (saved.to) root.style.setProperty('--brand-to', saved.to);
              if (saved.footerBg) root.style.setProperty('--brand-footer', saved.footerBg);
              if (saved.footerBorder) root.style.setProperty('--brand-footer-border', saved.footerBorder);
            } catch (e) {}
          })();
        `}} />
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
