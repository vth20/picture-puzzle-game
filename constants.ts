import img0 from "./assets/images/0_a_Dat.png";
import img1 from "./assets/images/1_a_Duc.png";
import img2 from "./assets/images/2_a_Dung.png";
import img4 from "./assets/images/4_a_Hiep.png";
import img5 from "./assets/images/5_a_Quang.png";
import img6 from "./assets/images/6_c_Le.png";
import img7 from "./assets/images/7_a_Nhat.png";
import img8 from "./assets/images/8_a_Thanh.png";

import o0 from "./assets/original/0_a_Dat.png";
import o1 from "./assets/original/1_a_Duc.png";
import o2 from "./assets/original/2_a_Dung.png";
import o4 from "./assets/original/4_a_Hiep.jpg";
import o5 from "./assets/original/5_a_Quang.png";
import o6 from "./assets/original/6_c_Le.png";
import o7 from "./assets/original/7_a_Nhat.png";
import o8 from "./assets/original/8_a_Thanh.png";
export const GRID_OPTIONS: number[] = [2, 3, 4, 6];

// Using placeholder images. Replace these with your actual company photos.
export type TData = {
  image: string;
  original: string;
}

export const IMAGE_URLS: TData[] = [
  {
    image: img0,
    original: o0
  },
  {
    image: img1,
    original: o1
  },
  {
    image: img2,
    original: o2
  },
  {
    image: img4,
    original: o4
  },
  {
    image: img5,
    original: o5
  },
  {
    image: img6,
    original: o6
  },
  {
    image: img7,
    original: o7
  },
  {
    image: img8,
    original: o8
  },
];
