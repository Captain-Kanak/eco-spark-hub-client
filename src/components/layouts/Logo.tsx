import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "ECO-HUB",
  };

  return (
    <Link
      href={logo.url}
      className="flex items-center gap-2 group transition-opacity hover:opacity-90"
    >
      <Image
        src={logo.src}
        width={32}
        height={40}
        alt={logo.alt}
        className="h-auto w-auto"
      />
      <span className="text-lg font-black tracking-tighter bg-linear-to-r text-emerald-300 to-emerald-800 bg-clip-text">
        {logo.title}
      </span>
    </Link>
  );
}
