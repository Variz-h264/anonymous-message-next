export const Card = ( { title, details, msg }: { title: string, details: string, msg: string } ) => {
  return (
    <div className="mt-10">
      <div className="border border-white/50 rounded-md p-5">
        <h3 className="text-3xl text-white mb-1">{title}</h3>
        <span className="text-white/50">{details}</span>

        <div className="flex justify-center items-center">
          <h3 className="text-3xl text-white mb-1">{msg}</h3>
        </div>
      </div>
    </div>
  );
};
