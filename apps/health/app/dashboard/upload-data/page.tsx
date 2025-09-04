import { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [year, setYear] = useState<number>(2024);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0] ?? null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/user/data/${year}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setMessage(`❌ Upload failed: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📂 Upload Excel Data</h1>

      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{ marginLeft: "1rem" }}
        />
      </label>

      <br />
      <br />

      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <br />
      <br />

      <button onClick={handleUpload}>Upload</button>

      <pre style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
        {message}
      </pre>
    </div>
  );
}

export default UploadPage;
