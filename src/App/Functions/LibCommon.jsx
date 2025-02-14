export function StrInclude(Str, Search) {
  if (typeof Str === "number") {
    Str = Str + ""
  }
  if (typeof Search === "number") {
    Search = Search + ""
  }
  if (typeof Search === "string" && !Search.length) {
    return true
  }
  if (typeof Str === "string" && typeof Search === "string") {
    return Str.toString().toLowerCase().includes(Search.toString().toLowerCase())
  }
  return false
}