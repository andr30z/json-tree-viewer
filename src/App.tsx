import { useRef, useState } from "react";
import { JsonViewer } from "./components/json-viewer";
import "./index.css";

function App() {
  const [json, setJson] = useState<{
    file: File;
    content: { [x: string]: unknown };
  }>();
  const [selectFileError, setSelectFileError] = useState<string | null>(null);

  const ref = useRef<HTMLInputElement>(null);

  return (
    <main>
      {json ? (
        <JsonViewer json={json.content} fileName={json.file.name} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <h1 className="text-5xl font-bold">JSON Tree Viewer</h1>
          <p className="text-2xl">
            Simple JSON Viewer that runs completely on-client. No data exchange
          </p>
          <button
            type="button"
            className="border rounded-md font-medium py-1.5 px-3"
            onClick={() => ref.current?.click()}
          >
            Load JSON
          </button>
          {selectFileError && (
            <p className="text-base text-error">{selectFileError}</p>
          )}
          <input
            ref={ref}
            className="hidden"
            type="file"
            accept="application/json"
            max={1}
            onChange={async (e) => {
              const file = e.target.files![0];
              console.log(e.target.files);
              if (file.type !== "application/json") {
                return setSelectFileError(
                  "Invalid file. Please load a valid JSON file."
                );
              }
              console.log("Start reading JSON: ", new Date());
              try {
                setJson({ file, content: JSON.parse(await file.text()) });
                setSelectFileError(null);
              } catch (error) {
                setSelectFileError(
                  "Invalid file. Please load a valid JSON file."
                );
                console.log(error);
              }

              console.log("End reading JSON: ", new Date());


            }}
          />
        </div>
      )}
    </main>
  );
}

export default App;
