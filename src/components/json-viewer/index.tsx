import { JsonKeys } from "./json-keys";

interface Props {
  json: { [x: string]: unknown };
  fileName: string;
}
export const JsonViewer: React.FC<Props> = ({ json, fileName }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <header className="flex items-start justify-start">
        <h1 className="text-[32px] leading-[38.73px] font-bold">{fileName}</h1>
      </header>
      <div>
        <JsonKeys json={json} />
      </div>
    </div>
  );
};
