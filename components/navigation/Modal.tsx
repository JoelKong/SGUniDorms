export default function Modal({ modal }: any): JSX.Element {
  return (
    <div className="absolute w-2/4 h-7 top-5 z-10 flex justify-center rounded-md tracking-wider bg-red-400 opacity-80 font-semibold text-gray-300 text-lg">
      {modal.message}
    </div>
  );
}
