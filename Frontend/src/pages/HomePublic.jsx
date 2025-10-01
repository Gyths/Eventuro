import BannerCarousel from "../components/BannerCarousel";

const banners = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1518976024611-28bf4a6d2a47",
  "https://images.unsplash.com/photo-1472653431158-6364773b2a56",
];

export default function HomePublic() {
  return (
    <>
      {/* Quita el padding del layout para el banner */}
      <div className="-mt-[72px]">
        <BannerCarousel images={banners} interval={6000} />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-4 text-2xl font-semibold">Música</h2>
        {/* aquí tu grid de <EventCard /> etc. */}
      </section>
    </>
  );
}
