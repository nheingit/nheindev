import Link from "next/link";

export const Hero: React.FC = () => (
  <section className="flex mb-12">
    <div className="mr-8">
      <h2 className="text-4xl font-bold mb-4">Hi there, I'm Noah 👋</h2>
      <p className="mb-4">
        I produce technical content for developers to educate them on both
        high-level concepts, and the nitty gritty. I also write daily as I
        believe that a daily writing habit is what brought me above the poverty
        line during the pandemic. You'll find a collection of my writings here,
        please let me know if you find any of them useful, I always want to talk
        to readers.
      </p>
      <Link className="text-black hover:text-red-500" href="#">
        {`View all Posts >`}
      </Link>
    </div>
    <img
      alt="Hero Asset"
      className="w-[400px] h-[400px] object-cover"
      height="400"
      src="/placeholder.svg"
      style={{
        aspectRatio: "400/400",
        objectFit: "cover",
      }}
      width="400"
    />
  </section>
);
