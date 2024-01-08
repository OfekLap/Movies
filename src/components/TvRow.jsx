function TvRow({ tv }) {
  return (
    <>
      <div
        className="flex gap-5 bg-[#343a40] m-0 rounded-md pt-2
         hover:bg-stone-700 cursor-pointer"
      >
        <img src={tv.image} alt="tv poster" className="w-12 h-16 ml-7 py-2" />
        <div className="text-white-50 text-lg">
          <h1>{tv.name}</h1>
          <h2>{tv.year}</h2>
        </div>
      </div>
    </>
  );
}

export default TvRow;
