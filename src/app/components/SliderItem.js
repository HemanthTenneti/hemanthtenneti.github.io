import Link from "next/link";
export default function SliderItem({
  title,
  description,
  image,
  codeUrl,
  hostedUrl,
}) {
  return (
    <div className="bg-[#171818] border border-[#414141] w-[800px] z-10 p-10 rounded-2xl slider-item">
      <img
        src={image || "/thumbnails/placeholder.png"}
        alt={title}
        className="-mt-30 mb-5 rounded-4xl"
      />
      <div className="flex flex-col gap-2 items-start justify-center ">
        <div className="text-[#F5EAD5]">
          <h1 className="font-bold text-4xl">{title}</h1>
          <p className="lowercase">{description}</p>
        </div>
        <div className="flex gap-2 items-center justify-start flex-grow">
          {codeUrl && (
            <Link
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white cursor-pointer px-5 py-2 rounded-full text-black hover:bg-gray-200 transition-colors">
              Code
            </Link>
          )}
          {hostedUrl && (
            <Link
              href={hostedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F0DFC0] cursor-pointer px-5 py-2 rounded-full text-black hover:bg-[#e5d4b5] transition-colors">
              Hosted URL
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
