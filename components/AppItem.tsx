import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

export const AppItem = ({ title, description, href, image, alt }: Props) => {
  return (
    <Link href={href}>
      <div className="bg-white rounded shadow p-6">
        <div className="flex items-center">
          <div>
            <Image src={image} alt={alt} width={52} height={52} />
          </div>
          <div className="flex-1 px-6">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
