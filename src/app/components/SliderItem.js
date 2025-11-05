import Link from "next/link";

export default function SliderItem({
  title,
  description,
  image,
  codeUrl,
  hostedUrl,
}) {
  return (
    <div className="bg-[#171818] border border-[#414141] w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px] z-10 px-4 sm:px-6 md:px-8 lg:p-10 py-6 sm:py-8 md:py-10 rounded-3xl slider-item">
      <div className="mb-4 sm:mb-5 md:mb-6 overflow-hidden rounded-2xl">
        <img
          src={image || "/thumbnails/placeholder.png"}
          alt={title}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="text-[#F5EAD5]">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl mb-2">
            {title}
          </h1>
          <p className="lowercase text-xs sm:text-sm md:text-base lg:text-base leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex gap-2 items-center justify-start flex-wrap">
          {codeUrl && (
            <Link
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white cursor-pointer px-3 sm:px-4 md:px-5 py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-full text-black hover:bg-gray-200 transition-colors">
              Code
            </Link>
          )}
          {hostedUrl && (
            <Link
              href={hostedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F0DFC0] cursor-pointer px-3 sm:px-4 md:px-5 py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-full text-black hover:bg-[#e5d4b5] transition-colors">
              Hosted URL
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
