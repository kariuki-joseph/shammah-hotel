import FsLightbox from "fslightbox-react";
import React, { useState } from "react";
import img1 from "../../assets/photo-gallery/img1.jpg";
import img2 from "../../assets/photo-gallery/img2.jpg";
import img3 from "../../assets/photo-gallery/img3.jpg";
import img4 from "../../assets/photo-gallery/img4.jpg";
import img5 from "../../assets/photo-gallery/img5.jpg";
import img6 from "../../assets/photo-gallery/img6.jpg";
import img7 from "../../assets/photo-gallery/img7.jpg";
import img8 from "../../assets/photo-gallery/img8.jpg";

const PhotoGallery = () => {
  const [toggler, setToggler] = useState(null);

  return (
    <div className="mt-12 mb-12">
      <div className="w-full xl:w-[1100px] mx-auto border-t">
        <div>
          <p className="text-xl xl:text-2xl font-semibold text-[#000080] uppercase mb-2 mt-3">
            Photo Gallery
          </p>
        </div>
        <div className="grid grid-cols-1 place-content-center place-items-center xl:grid-cols-4 gap-2 cursor-pointer">
            <img onClick={() => setToggler(!toggler)} className="w-[263px] h-[214px] rounded " src={img1} alt="" />
            <img onClick={() => setToggler(!toggler)} className="w-[263px] h-[214px] rounded" src={img2} alt="" />
            <img onClick={() => setToggler(!toggler)} className="w-[263px] h-[214px] rounded" src={img3} alt="" />
            <img onClick={() => setToggler(!toggler)} className="w-[263px] h-[214px] rounded" src={img4} alt="" />
            <img onClick={() => setToggler(!toggler)} className="w-[263px] h-[214px] rounded" src={img5} alt="" />
            <img onClick={() => setToggler(!toggler)} className="w-[263px] h-[214px] rounded" src={img6} alt="" />
            <img onClick={() => setToggler(!toggler)} className="w-[263px] h-[214px] rounded" src={img7} alt="" />
            <img onClick={() => setToggler(!toggler)} className="w-[263px] h-[214px] rounded" src={img8} alt="" />
        </div>
        <>
			
			 <FsLightbox
				toggler={toggler}
				sources={[
          img1,
          img2,
          img3,
          img4,
          img5,
          img6,
          img7,
          img8,
				]}
			/>
		 </>
      </div>
    </div>
  );
};

export default PhotoGallery;
