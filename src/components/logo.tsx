import Image from "next/image"

interface LogoProps {
  siteName?: string
  logoUrl?: string | null
  className?: string
  showText?: boolean
}

export const Logo = ({ siteName = "Imobifolio", logoUrl, className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {logoUrl ? (
        <div className="relative h-10 w-10 overflow-hidden rounded-lg">
          <Image
            src={logoUrl}
            alt={siteName}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-slate-950 p-1 border border-amber-500/30 flex items-center justify-center shadow-md">
          <Image
            src="/imobifolio-logo.jpg"
            alt={siteName}
            width={36}
            height={36}
            className="object-contain rounded"
          />
        </div>
      )}

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1">
            {siteName}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80 -mt-1">
            Imóveis de Alto Padrão
          </span>
        </div>
      )}
    </div>
  )
}
