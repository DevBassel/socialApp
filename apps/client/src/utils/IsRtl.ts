export function isRTL(s: string): boolean {
  const ltrChars =
    "A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF" +
    "\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF";
  const rtlChars = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
  // eslint-disable-next-line no-misleading-character-class
  const rtlDirCheck = new RegExp(`^[^${ltrChars}]*[${rtlChars}]`);

  return rtlDirCheck.test(s);
}
