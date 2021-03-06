import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Input } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import axios from "axios";

const { Column } = Table;

const List = () => {
  const [tableData, setTableData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editedFilename, setEditedFilename] = useState(null);
  const [editedFilenameId, setEditedFilenameId] = useState(null);
  console.log(deleteLoading);

  const deleteFile = async (id) => {
    let loading = deleteLoading.slice();
    loading[id] = true;
    setDeleteLoading(loading);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/delete/${id}`
      );
      console.log(response);
      getAllData();
      loading[id] = false;
      setDeleteLoading(loading);
    } catch (e) {
      console.log(e);
    }
  };

  const editFile = (id, fileName) => {
    setOpenEditModal(true);
    setEditedFilename(fileName);
    setEditedFilenameId(id);
  };
  const handleEditOk = async () => {
    setConfirmLoading((state) => !state);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/updateFileName/${editedFilenameId}/${editedFilename}`
      );
      console.log(response);
      getAllData();
      setEditedFilename(null);
      setEditedFilenameId(null);
      setOpenEditModal(false);
      setConfirmLoading((state) => !state);
    } catch (err) {
      console.log(err);
    }
  };

  // const downloadFile = async (id) => {
  //   axios({
  //     url: `${process.env.REACT_APP_API_BASE_URL}/files/${id}`, //your url
  //     method: "GET",
  //     responseType: "blob",
  //   }).then((response) => {
  //     const fileName = response.headers["content-disposition"].split(
  //       "filename="
  //     )[1];
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", fileName); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // };

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/files`
      );

      const data = response.data.map((item) => {
        return {
          key: item._id,
          fileName: item.filename,
        };
      });
      setTableData(data);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div>
      <Table dataSource={tableData} pagination={false}>
        <Column title="Filename" dataIndex="fileName" key="fileName" />
        <Column
          title="Link"
          key="link"
          render={(text, record) => (
            <Space size="middle">
              <a
                className="download"
                href={`${process.env.REACT_APP_API_BASE_URL}/files/${record.key}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Download
              </a>
            </Space>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                icon={<EditFilled />}
                onClick={() => editFile(record.key, record.fileName)}
              />
              <Button
                icon={<DeleteFilled />}
                loading={deleteLoading[record.key] || false}
                onClick={() => deleteFile(record.key)}
              />
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Edit Filename"
        visible={openEditModal}
        onOk={() => handleEditOk()}
        onCancel={() => setOpenEditModal(false)}
        confirmLoading={confirmLoading}
      >
        <Input
          value={editedFilename}
          onChange={(e) => setEditedFilename(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default List;
