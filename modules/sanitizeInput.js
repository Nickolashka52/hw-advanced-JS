export function sanitizeInput(input) {
    return input.trim().replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
