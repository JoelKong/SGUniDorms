export default function PasswordPanel(): JSX.Element {
  return (
    <div className="absolute border-4 rounded-lg w-64 md:w-72 h-fit right-8 md:left-8 bg-pink-300 animate-fade">
      <ul className="p-2 list-disc ml-4">
        <li>At least 8 characters</li>
        <li>At least one small letter</li>
        <li>At least one capital letter</li>
        <li>At least one number</li>
        <li>At least one symbol</li>
      </ul>
    </div>
  );
}
