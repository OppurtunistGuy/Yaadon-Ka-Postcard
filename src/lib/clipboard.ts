/**
 * Robust, cross-browser clipboard copy function with fallback for
 * non-HTTPS / localhost / mobile Safari / older webviews.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // 1. Try Modern Async Clipboard API if available
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("navigator.clipboard.writeText failed, attempting fallback:", err);
    }
  }

  // 2. Fallback: document.execCommand('copy') with invisible textarea
  if (typeof document !== "undefined") {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.contain = "strict";
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      textarea.style.fontSize = "12pt"; // Prevent iOS zooming on focus
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      // Select content
      const selection = window.getSelection();
      const originalRange =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (originalRange && selection) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
      }

      if (successful) {
        return true;
      }
    } catch (err) {
      console.error("execCommand fallback failed:", err);
    }
  }

  return false;
}
