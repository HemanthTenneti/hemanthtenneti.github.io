import Image from "next/image";
export default function HomePage() {
  return (
    <div>
      <header className="flex h-[80vh] w-full px-30">
        <img
          src="/circleglow.png"
          alt="Circle Glow"
          className="absolute bottom-0 left-0 -z-20 object-cover"
        />
        <img
          src="/rayglow.png"
          alt="Ray Glow"
          className="absolute top-0 right-0 -z-20 object-cover"
        />
        <img className="" src="/hemanthpfp.png" alt="Hemant" />
        <div className="flex flex-col flex-grow justify-center items-end">
          <h1 className="heading-text text-right text-8xl text-[#20201E] font-bold">
            hi! i&apos;m hemanth
          </h1>
          <h2 className="text-6xl text-right font-bold">
            a passion for coding
            <br /> with an insatiable curiosity
            <br />
            fuelling my portfolio
          </h2>
        </div>
      </header>
      <section className="bg-[#2C2C2C] rounded-t-2xl p-[96px] z-11">
        <h3 className="text-4xl text-center">
          Driven by music and a love for clean, purposeful code, I enjoy
          building creative and efficient tech solutions. From automation to
          full-stack , I focus on solving real problems with clarity and intent.
          Bringing both technical and a forward-thinking mindset to everything I
          create.
        </h3>
      </section>
    </div>
  );
}
