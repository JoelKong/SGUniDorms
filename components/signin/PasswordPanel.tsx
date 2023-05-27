export default function PasswordPanel(): JSX.Element {
  return (
    <div className="absolute border-4 rounded-lg w-72 h-fit right-8 bg-pink-300">
      <ul className="p-2 list-disc ml-4">
        <li>At least 8 characters</li>
        <li>At least one small letter</li>
        <li>At least one capital letter</li>
        <li>At least one number or symbol</li>
      </ul>
    </div>
  );
}
