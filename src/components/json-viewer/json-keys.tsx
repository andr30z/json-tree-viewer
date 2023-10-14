import { Fragment, memo, useCallback, useMemo } from "react";
import { useOnWhenVisible } from "../../hooks/useOnWhenVisible";

const JsonItem = memo<{
  propName: string;
  value: unknown;
  isIndexOfArray?: boolean;
}>(({ propName: key, value, isIndexOfArray }) => {
  const [ref, isVisible] = useOnWhenVisible<HTMLSpanElement>(false);

  const type = typeof value;
  const isArray = Array.isArray(value);
  return (
    <Fragment key={key}>
      <span
      ref={ref}
        className={`${
          isIndexOfArray ? "text-json-gray" : "text-json-key"
        } font-normal`}
        title={key}
        tabIndex={1}
      >
        {key}:{" "}
        {type !== "object" && (
          <span
            title={String(value)}
            className="text-black font-normal"
            dangerouslySetInnerHTML={{
              __html:
                type === "boolean" || type === "number" || value === null
                  ? (value as string)
                  : '"' + value + '"',
            }}
          />
        )}
        {isArray && <span className="font-normal text-json-bracket">[</span>}
      </span>
      {type === "object" && value !== null && isVisible && (
        <div className="flex flex-col">
          <JsonKeys
            json={value as { [x: string]: unknown }}
            isIndexOfArray={isArray}
          />
          {isArray && <span className="font-normal text-json-bracket">]</span>}
        </div>
      )}
    </Fragment>
  );
});

export const JsonKeys = memo<{
  json: { [x: string]: unknown };
  isIndexOfArray?: boolean;
}>(({ json, isIndexOfArray = false }) => {
  //   const isVisible = true,
  //     setRef = () => null;
  const keyValues = useMemo(() => Object.entries(json), [json]);

  const mapFunction = useCallback(
    ([key, value]: [string, unknown]) => (
      <JsonItem
        key={key}
        propName={key}
        value={value}
        isIndexOfArray={isIndexOfArray}
      />
    ),
    [isIndexOfArray]
  );
  return (
    <div className="flex flex-row">
      <div className="h-full w-[0.8px] bg-json-gray mr-4 ml-[2.5px]" />
      <div className="flex flex-col">{keyValues.map(mapFunction)}</div>
    </div>
  );
});
