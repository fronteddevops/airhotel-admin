export function applyPagination(documents, page, rowsPerPage) {
  if (!Array.isArray(documents)) {
    console.error("Invalid 'documents' parameter. Expected an array.");
    return [];
  }

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return documents.slice(startIndex, endIndex);
}
