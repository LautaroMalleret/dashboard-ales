const VITE_API_IMGBB = import.meta.env.VITE_API_IMGBB; // o usá una variable de entorno

export const subirMultiplesImagenes = async (
  files: FileList
): Promise<string[]> => {
  const nuevasUrls: string[] = [];

  for (const file of Array.from(files)) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${VITE_API_IMGBB}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        nuevasUrls.push(data.data.url);
      } else {
        throw new Error(`Error al subir una imagen: ${file.name}`);
      }
    } catch (err) {
      console.error(err);
      throw new Error(`Fallo al subir ${file.name}`);
    }
  }

  return nuevasUrls;
};
