import Image from "next/image";
import React from "react";

type ProfileImageProps = {
  src?: string | null;
  className?: string;
};

const ProfileImage = ({ src, className = "" }: ProfileImageProps) => {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? null : (
        <Image className={`h-full w-full`} fill src={src} alt="" quality={100 }/>
      )}
    </div>
  );
};

export default ProfileImage;
