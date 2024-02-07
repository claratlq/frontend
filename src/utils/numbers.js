const Formatter = Intl.NumberFormat("en", { notation: "compact" });

export function numberWithCommas(input) {
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function nFormatter(input) {
  return Formatter.format(input);
}

export function dollarFormat(input) {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD"
  }).format(input);
}

export function humanFileSize(inputBytes, si = false, dp = 1) {
  let bytes = inputBytes;
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    u += 1;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  // Use template literals instead of string concatenation
  return `${bytes.toFixed(dp)} ${units[u]}`;
}

export function milliToHms(milli = 0) {
  const d = parseFloat(milli) / 1_000.0;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = parseFloat((d % 3600.0) % 60);

  const hDisplay = h >= 1 ? `${h}h ` : "";
  const mDisplay = m >= 1 ? `${m}m ` : "";
  const sDisplay = s >= 0.01 ? `${s.toFixed(2)}s` : "";
  return hDisplay + mDisplay + sDisplay;
}
