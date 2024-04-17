import React from "react";

import RestaurantImage from "../../assets/bars_and_restaurants.jpeg";

const ResturantAndBar = () => {
  return (
    <div className="w-11/12 xl:w-[1100px] mx-auto mt-12 border-t">
      <p>
        <p className="text-xl xl:text-2xl font-semibold text-[#000080] uppercase mb-2 mt-3">
          Restaurants and bars
        </p>
      </p>
      <div>
        <div className="flex flex-col xl:flex-row gap-6">
          <img
            className="xl: w-[550px] h-[330px] rounded"
            src={RestaurantImage}
            alt=""
          />
          <p className="text-[#53565A] text-justify">
            Experience the luxury of Shammah Hotel in Nyeri, Kenya, where you
            can indulge in culinary delights across four restaurants and two
            bars. Begin your day with a satisfying breakfast at the Water Garden
            Brasserie, and return for lunch and dinner to savor an international
            buffet featuring live cooking stations. Delight in the refined
            ambiance of Sublime, where locally sourced ingredients are
            transformed into exquisite fine cuisine. Craving a lighter option?
            Head to Chit Chat for an array of sandwiches, salads, and quiches.
            In the evenings, unwind with cocktails and live entertainment at
            either The Blaze Entertainment Lounge & Bar or The Cigar Bar,
            creating memorable moments with friends and loved ones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResturantAndBar;
