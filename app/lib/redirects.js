

export function getSafeNextPath(value, fallback = "/menu") {
    if (
        typeof value !== "string" ||
        !value.startsWith("/") ||
        value.startsWith("//") ||
        value.includes("\\")
    ) {
        return fallback;
    }

    return value;
}