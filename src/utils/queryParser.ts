export function queryParser<T>(search: string): T {
  const queryParamsString: string = search.slice(1); // remove '?'
  const queryParamsArray: string[] = queryParamsString.split("&");
  return queryParamsArray.reduce<T>((acc, item) => {
    const [key, value] = item.split("=");
    // @ts-ignore
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as T);
}
