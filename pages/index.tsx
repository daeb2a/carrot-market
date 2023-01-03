export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-2 p-5">
        <details className="select-none cursor-pointer open:text-white open:bg-purple-500">
          <summary className="select-none">What is your fav. food?</summary>
          <span>kimchi</span>
        </details>
      </div>
      <div className="flex flex-col space-y-2 p-5">
        <ul className="list-decimal marker:text-teal-500">
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
        </ul>
      </div>
      <div className="flex flex-col space-y-2 p-5">
        <input type="file" className="file:hover:border-teal-500" />
      </div>
      <div className="flex flex-col space-y-2  p-5 ">
        <p className="first-letter:text-7xl first-letter:hover:text-purple-400">
          Hello everyone!
        </p>
      </div>
    </>
  );
}
