// Stores uploaded files as DataURL so it works with LocalStorage (small files only).
// Recommend: images only, keep files small.
export async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File read failed"));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
