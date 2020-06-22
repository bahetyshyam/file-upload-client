import React, { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const onFileChange = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = async (e) => {
    setLoading(!loading);
    const data = new FormData();
    data.append("file", selectedFile, selectedFile.name);
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/upload`, data)
      .then((data) => {
        console.log(data);
        // setResponseFromServer(data);
        setLoading(false);
        setMessage("File Upload Successful");
        setModalVisible(true);
        setSelectedFile(null);
      })
      .catch((e) => {
        console.log(e.response);
        setMessage("Please upload PNG/JPEG/MP4/PDF formats only.");
        setModalVisible(true);
        setLoading(false);
      });
  };

  return (
    <div>
      <input
        onChange={onFileChange}
        style={{ display: "none" }}
        id="file"
        type="file"
        accept="*"
      />
      <label htmlFor="file" className="uploadbox">
        {selectedFile && (
          <Button
            type="primary"
            onClick={onFileUpload}
            loading={loading}
            style={{ marginBottom: 10 }}
          >
            Upload
          </Button>
        )}

        <span>{selectedFile ? selectedFile.name : "Upload Test Files"}</span>
      </label>
      <Modal
        title="Message"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <p>{message}</p>
      </Modal>
    </div>
  );
};

export default Upload;
