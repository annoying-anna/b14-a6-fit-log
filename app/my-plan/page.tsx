import type { Metadata } from "next";

import MyPlanView from "@/components/MyPlanView";

export const metadata: Metadata = {
  title: "My Plan",
  description:
    "Today's plan, saved lifts, live minutes and calories — capped at five lifts so you actually finish the session.",
};

export default function MyPlanPage() {
  return <MyPlanView />;
}
