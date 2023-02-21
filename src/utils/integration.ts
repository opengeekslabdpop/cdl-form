export function addScript(name: string): void {
  let elem = document.createElement("script");
  elem.type = "text/javascript";
  elem.async = true;
  document.body.appendChild(elem);
  elem.src = name;
}

export function addStyle(name: string): void {
  let elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type = "text/css";
  document.body.appendChild(elem);
  elem.href = name;
}
