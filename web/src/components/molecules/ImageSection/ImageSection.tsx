import Image from 'next/image';
import clsx from 'clsx';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  desktopSize?: { width: number; height: number };
  className?: string;
}

export const ResponsiveImage = ({
  src,
  alt,
  desktopSize = { width: 800, height: 800 },
  className,
}: ResponsiveImageProps) => (
  <>
    {/* Mobile */}
    <div
      className={clsx(
        'md:hidden rounded-full overflow-hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px]',
        className
      )}
    >
      <Image src={src} className="object-cover" fill alt={alt} />
    </div>
    {/* Desktop */}
    <div className={clsx('hidden md:flex md:flex-col', className)}>
      <Image src={src} className="object-cover" {...desktopSize} alt={alt} />
    </div>
  </>
);
