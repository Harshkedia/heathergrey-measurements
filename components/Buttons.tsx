export const Buttons = ({ prevProps, nextProps }: any) => (
  <div className="flex justify-between items-center w-full">
    <button
      className="border border-gray-200 px-6 py-2 bg-[#fcfcfc]"
      {...prevProps}
    >
      Prev
    </button>

    <button
      className="bg-[#DB302B] text-white px-6 py-2"
      {...nextProps}
      type="submit"
    >
      Next
    </button>
  </div>
);
