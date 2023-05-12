import { useRef } from "react";
import "./index.css";
import { VisaIcon } from "./visa";

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="w-5xl mx-auto mt-24 max-w-[90%]">
      <h1 className="text-3xl font-medium">Billing details</h1>
      <div className="mt-4 flex flex-col rounded-2xl bg-gray-900 p-8 text-xl text-white">
        <p>Premium plan</p>
        <p className="text-sm">Your plan renews on 01/01/2024</p>

        <div className="mt-4 flex items-center gap-3 self-start rounded-2xl bg-gray-800 px-4 py-8">
          <div className="w-20 rounded-xl bg-white px-3 py-1">
            <VisaIcon />
          </div>
          <div>•••• •••• •••• 1234</div>
          <button
            onClick={() => dialogRef?.current?.showModal()}
            className="ml-8 rounded-md bg-gray-600 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700"
          >
            Change payment method
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onSubmit={(ev) => {
          const formData = new FormData(ev.target as HTMLFormElement);
          console.log(formData.get("card-number"));
        }}
        onClick={(ev) => {
          const target = ev.target as HTMLDialogElement;
          if (target.nodeName === "DIALOG") {
            target.close();
          }
        }}
        onClose={(ev) => {
          const target = ev.target as HTMLDialogElement;
          console.log(target.returnValue);
        }}
        className="text-md inset-0 block w-2/3 translate-y-20 rounded-2xl p-0 opacity-0
        transition-[opacity,transform] duration-300 backdrop:backdrop-blur-sm
        [&:not([open])]:pointer-events-none [&[open]]:translate-y-0 [&[open]]:opacity-100"
      >
        <form method="dialog">
          <header className="relative rounded-t-2xl bg-white px-8 pt-6">
            <h1 className="text-2xl font-bold">Change your payment method</h1>
            <button
              type="button"
              onClick={() => dialogRef?.current?.close()}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 p-3 text-xl"
            >
              <span className="sr-only">close</span> &times;
            </button>
          </header>
          <main className="space-y-3 bg-white px-8 py-16">
            <div className="flex items-center">
              <label className="mr-auto w-1/3 text-gray-400">Card number</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                type="text"
                name="card-number"
              />
            </div>

            <div className="flex items-center">
              <label className="mr-auto w-1/3 text-gray-400">Expiration</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                type="text"
                name="expiration"
              />
            </div>

            <div className="flex items-center">
              <label className="mr-auto w-1/3 text-gray-400">CVC</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                type="password"
                name="cvc"
                placeholder="•••"
              />
            </div>
          </main>
          <footer className="flex justify-end gap-6 rounded-b-2xl bg-gray-100 px-8 py-4">
            <button
              className="text-gray-400"
              formMethod="dialog"
              value="cancel"
            >
              Cancel
            </button>
            <button
              className="rounded-xl bg-blue-500 px-5 py-3 text-white shadow-md transition-colors hover:bg-blue-600"
              formMethod="dialog"
              value="submit"
            >
              Save changes
            </button>
          </footer>
        </form>
      </dialog>
    </div>
  );
}

export default App;
