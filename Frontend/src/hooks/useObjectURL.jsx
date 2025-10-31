import { useEffect, useState } from "react";

export default function useObjectURL(fileOrBlob) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!fileOrBlob) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(fileOrBlob);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [fileOrBlob]);

  return url;
}