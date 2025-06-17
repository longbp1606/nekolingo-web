import firefire from "@/assets/firefire.png";
import thunder from "@/assets/thunder.png";
import prize from "@/assets/prize.png";
import cup from "@/assets/cup.png";
import scholar from "@/assets/scholar.png";
import star from "@/assets/star.png";

export const percentage1: number = 40;
export const percentage2: number = 0;
export const percentage3: number = 100;

export const profile = {
  name: "Nguyen Tran",
  handle: "@nguyentran10700",
  joinDate: "Đã tham gia Tháng Năm 2025",
  following: 0,
  followers: 0,
};

export const stats = [
  {
    icon: firefire,
    label: "Ngày streak",
    value: "0",
    className: "streak",
  },
  {
    icon: thunder,
    label: "Tổng điểm XP",
    value: "237",
    className: "lightning",
  },
  {
    icon: prize,
    label: "Giải đấu hiện tại",
    value: "Đồng",
    className: "bronze",
  },
  {
    icon: cup,
    label: "Số dấu đạt top 3",
    value: "0",
    className: "trophy",
  },
];

export const achievements = [
  {
    level: "Cấp 1",
    className: "fire",
    icon: firefire,
    name: "Lửa rồng",
    progressText: "2/3",
    percentage: percentage1,
    desc: "Đạt chuỗi 3 ngày streak",
  },
  {
    level: "Cấp 2",
    className: "scholar",
    icon: star,
    name: "Cao nhân",
    progressText: "237/250",
    percentage: percentage2,
    desc: "Đạt được 250 XP",
  },
  {
    level: "Cấp 1",
    className: "student",
    icon: scholar,
    name: "Học giả",
    progressText: "0/50",
    percentage: percentage3,
    desc: "Học 50 từ mỗi trong một khóa học",
  },
];
