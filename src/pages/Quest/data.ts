import firefire from "@/assets/firefire.png";
import scholar from "@/assets/scholar.png";
import star from "@/assets/star.png";

export const percentage1: number = 100;
export const percentage2: number = 40;
export const percentage3: number = 25;

export const achievements = [
    {
        className: "fire",
        icon: firefire,
        name: "Kiếm 10 KN",
        progressText: "10/10",
        percentage: percentage1,
    },
    {
        className: "scholar",
        icon: star,
        name: "Học trong 5 phút",
        progressText: "237/250",
        percentage: percentage2,
    },
    {
        className: "fire",
        icon: firefire,
        name: "Làm đúng 5 câu liên tiếp trong 4 bài học",
        progressText: "2/3",
        percentage: percentage3,
    },
];
