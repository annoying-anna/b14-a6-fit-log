import LibrarySkeleton from "@/components/LibrarySkeleton";

export default function HomeLoading() {
  return (
    <div className="shell py-20">
      <LibrarySkeleton label="Loading workouts…" count={6} />
    </div>
  );
}
