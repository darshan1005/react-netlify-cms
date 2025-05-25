import React, { useState } from "react";

const ManualUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
    imagePath: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      const localPath = `/uploads/${file.name}`;
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePath: localPath,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, link, imagePath } = formData;

    // Simulate saving to JSON file
    const newEntry = {
      title,
      description,
      link,
      image: imagePath,
    };

    console.log("Generated JSON:", JSON.stringify(newEntry, null, 2));
    alert("Form submitted! Copy this JSON to a file in src/content/projects/");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input name="title" type="text" required onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" required onChange={handleChange} />
        </div>
        <div>
          <label>Link:</label>
          <input name="link" type="url" required onChange={handleChange} />
        </div>
        <div>
          <label>Image:</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">Generate JSON</button>
      </form>

      {formData.imagePath && (
        <div style={{ marginTop: "20px" }}>
          <p>Image Preview:</p>
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            width="200"
          />
          <p>
            Path: <code>{formData.imagePath}</code>
          </p>
        </div>
      )}
    </div>
  );
};

export default ManualUploadForm;
