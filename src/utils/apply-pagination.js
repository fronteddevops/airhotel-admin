export function applyPagination(documents, page, rowsPerPage) {

  // const data = [documents]
  const data = documents?.rows


  if (!Array.isArray(data)) {
    console.error("Invalid 'documents' parameter. Expected an array.");
    return [];
  }

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return data?.slice(startIndex, endIndex);
}
 
