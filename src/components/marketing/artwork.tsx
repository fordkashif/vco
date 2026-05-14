import { cn } from "@/lib/utils"

export function HeroWaveArtwork({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2.8rem] bg-slate-950", className)}>
      <svg viewBox="0 0 800 720" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="720" fill="#0f172a" />
        <circle cx="640" cy="120" r="220" fill="url(#heroGlow)" fillOpacity="0.9" />
        <path d="M-70 508C111 398 268 391 399 445C530 499 644 499 844 362" stroke="#fff" strokeOpacity="0.08" strokeWidth="3" />
        <path d="M-58 553C123 443 280 436 411 490C542 544 656 544 856 407" stroke="#fff" strokeOpacity="0.06" strokeWidth="3" />
        <path d="M-64 598C117 488 274 481 405 535C536 589 650 589 850 452" stroke="#fff" strokeOpacity="0.05" strokeWidth="3" />
        <path d="M120 522C200 471 286 450 389 456C522 464 634 535 755 513" stroke="#8fb2ff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
        <path d="M135 572C229 525 312 509 410 519C509 529 590 589 704 582" stroke="#5d8dff" strokeOpacity="0.45" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M156 311C248 246 362 222 454 237C546 252 620 288 712 249" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="510" y="86" width="164" height="164" rx="34" fill="#101827" stroke="#ffffff" strokeOpacity="0.1" />
        <rect x="534" y="112" width="114" height="18" rx="9" fill="#1f2937" />
        <rect x="534" y="148" width="84" height="84" rx="22" fill="#2563eb" fillOpacity="0.18" stroke="#8fb2ff" strokeOpacity="0.4" />
        <path d="M552 198C566 178 581 168 599 168C626 168 645 189 645 216" stroke="#8fb2ff" strokeWidth="4" strokeLinecap="round" />
        <defs>
          <radialGradient id="heroGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(640 120) rotate(90) scale(220)">
            <stop stopColor="#3B82F6" stopOpacity="0.95" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
    </div>
  )
}

export function PosterArtwork({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle: string
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2.3rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8", className)}>
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="500" fill="#ffffff" />
        <circle cx="420" cy="80" r="140" fill="#dbe7ff" />
        <path d="M-40 360C80 280 164 255 254 262C349 270 409 332 546 286" stroke="#0f172a" strokeOpacity="0.08" strokeWidth="3" />
        <path d="M-20 410C100 330 184 305 274 312C369 320 429 382 566 336" stroke="#2563eb" strokeOpacity="0.18" strokeWidth="4" />
        <path d="M58 407C124 374 174 359 237 366C303 373 354 410 443 398" stroke="#0f172a" strokeOpacity="0.14" strokeWidth="2.5" />
      </svg>
      <p className="relative text-[11px] uppercase tracking-[0.28em] text-slate-400">Editorial note</p>
      <p className="relative mt-5 whitespace-pre-line font-display text-4xl leading-[0.9] tracking-[-0.08em] text-slate-950 sm:text-5xl">
        {title}
      </p>
      <p className="relative mt-5 max-w-xs text-sm leading-7 text-slate-600">{subtitle}</p>
    </div>
  )
}

export function MembershipOrbArtwork({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2.6rem] bg-slate-950", className)}>
      <svg viewBox="0 0 620 420" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="620" height="420" fill="#0f172a" />
        <circle cx="458" cy="140" r="122" fill="#2563eb" fillOpacity="0.24" />
        <circle cx="458" cy="140" r="84" fill="#60a5fa" fillOpacity="0.16" />
        <path d="M-18 286C101 250 176 233 250 238C332 244 401 275 495 264C556 257 597 237 646 214" stroke="#8fb2ff" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
        <path d="M-8 320C111 284 186 267 260 272C342 278 411 309 505 298C566 291 607 271 656 248" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <rect x="68" y="86" width="182" height="234" rx="28" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.16" />
        <rect x="92" y="112" width="134" height="16" rx="8" fill="#ffffff" fillOpacity="0.16" />
        <rect x="92" y="150" width="96" height="96" rx="22" fill="#2563eb" fillOpacity="0.25" stroke="#8fb2ff" strokeOpacity="0.36" />
        <rect x="92" y="264" width="134" height="16" rx="8" fill="#ffffff" fillOpacity="0.14" />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
    </div>
  )
}
