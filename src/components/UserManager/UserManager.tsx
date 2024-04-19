import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { StylesUserManager } from "@/components/UserManager/style/index";
import { Button, Pagination, Input, Modal, Form } from "antd";
import type { FormProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const { Search } = Input;

type FieldType = {
  username?: string;
  name?: string;
  password?: string;
};

const user = [
  {
    id: 1,
    username: "hoangcongminh1@gmail.com",
    name: "Hoàng Minh3",
    password: "123",
  },
  {
    id: 2,
    username: "hoangcongminh2@gmail.com",
    name: "Hoàng Minh1",
    password: "123",
  },
  {
    id: 3,
    username: "hoangcongminh3@gmail.com",
    name: "Hoàng Minh4",
    password: "123",
  },
  {
    id: 4,
    username: "hoangcongminh4@gmail.com",
    name: "Hoàng Minh2",
    password: "123",
  },
  {
    id: 5,
    username: "hoangcongminh5@gmail.com",
    name: "Hoàng Minh5",
    password: "123",
  },
  {
    id: 6,
    username: "hoangcongminh6@gmail.com",
    name: "Hoàng Minh6",
    password: "123",
  },
  {
    id: 7,
    username: "hoangcongminh7@gmail.com",
    name: "Hoàng Minhrwer",
    password: "123",
  },
  {
    id: 8,
    username: "hoangcongminh8@gmail.com",
    name: "Hoàng Minh123",
    password: "123",
  },
  {
    id: 9,
    username: "hoangcongminh@gmail.com",
    name: "Hoàng Minhqwe",
    password: "123",
  },
  {
    id: 10,
    username: "hoangcongminh9@gmail.com",
    name: "Hoàng Minhsa",
    password: "123",
  },
];

export default function UserManager() {
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const [listUser, setListUser] = useState(user);
  const [isModalNewOpen, setIsModalNewOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState({});

  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const itemsPerPage = pageSize || 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listUser.slice(indexOfFirstItem, indexOfLastItem);

  //handle Add
  const onFinishAdd: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    const valueWithID = { ...values, id: uuidv4() };
    setListUser((prev) => [...prev, valueWithID]);
    setIsModalNewOpen(false);
  };

  const onFinishFailedAdd: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const showModal = () => {
    setIsModalNewOpen(true);
  };

  const handleCancelNew = () => {
    setIsModalNewOpen(false);
  };

  const showModalEdit = (item) => {
    setIsModalEditOpen(true);
    setCurrentEditItem(item);
    setEditName(item.name);
  };

  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
  };

  function handleNameChange(e) {
    setEditName(e.target.value);
  }

  function handlePasswordChange(e) {
    setEditPassword(e.target.value);
  }

  function handleEdit() {
    if (editName && editPassword) {
      listUser.map((item, index) => {
        if (item.id === currentEditItem.id) {
          const newItem = {
            id: item.id,
            username: item.username,
            name: editName,
            password: editPassword,
          };
          listUser.splice(index, 1, newItem);
          setIsModalEditOpen(false);
        }
      });
    } else {
      alert("Mời bạn nhập dữ liệu!");
    }
  }

  function handleDelete(index: number) {
    const newArray = listUser.slice();
    newArray.splice(index, 1);
    setListUser(newArray);
  }

  function handleInputSearch(e) {
    setInputSearch(e.target.value);
  }

  function handleSearchUser() {
    const listSearch = user.filter((item, index) => {
      return item.name
        .trim()
        .toLowerCase()
        .includes(inputSearch.trim().toLowerCase());
    });
    setListUser(listSearch);
  }

  return (
    <StylesUserManager>
      <div className="user-manager">
        <DrawerSide name="User Manager">
          <UserNavbar classID={true} />
        </DrawerSide>
        <div className="manager-content">
          <h3 className="manager-heading">{"Home > User Manager"}</h3>
          <div className="manager-action">
            <Search
              placeholder="Search"
              enterButton={
                <Button className="search-btn" onClick={handleSearchUser}>
                  <SearchOutlined />
                </Button>
              }
              value={inputSearch}
              className="manager-search"
              onChange={handleInputSearch}
            />
            <Button className="manager-btn" onClick={showModal}>
              <img src="/src/assets/images/add.svg" alt="" />
              <p>New User</p>
            </Button>
          </div>
          <div className="manager-detail">
            <div className="total-user">Tổng số tài khoản: 85</div>
            <div className="manager-list">
              {currentItems.map((item, index) => (
                <div className="manager-item" key={index}>
                  <div className="item-desc">
                    <p>Username: {item.username}</p>
                    <p>Name: {item.name}</p>
                  </div>
                  <div className="item-action">
                    <img
                      src="/src/assets/images/pencil.svg"
                      alt=""
                      onClick={() => showModalEdit(item)}
                    />
                    <img
                      src="/src/assets/images/remove.svg"
                      alt=""
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="manager-pagination">
          <Pagination
            current={currentPage}
            total={listUser.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>

      <Modal
        title="Thêm người dùng"
        open={isModalNewOpen}
        className="modal-add"
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
          autoComplete="off"
          className="form-login"
        >
          <Form.Item<FieldType>
            name="username"
            label="Username:"
            rules={[{ required: true, message: "Mời bạn nhập Username" }]}
          >
            <Input
              size="large"
              placeholder="username"
              className="login-input"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="name"
            label="Name:"
            rules={[{ required: true, message: "Mời bạn nhập tên" }]}
          >
            <Input
              size="large"
              placeholder="name"
              className="login-input second-input"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Mời bạn nhập mật khẩu" }]}
            label="Password:"
          >
            <Input.Password
              size="large"
              placeholder="password"
              className="login-input second-input"
            />
          </Form.Item>

          <Form.Item>
            <div className="modal-action">
              <Button className="login-btn" onClick={handleCancelNew}>
                Huỷ
              </Button>
              <Button type="primary" htmlType="submit" className="login-btn">
                Thêm User
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Sửa người dùng"
        open={isModalEditOpen}
        className="modal-edit"
      >
        <label htmlFor="">Username:</label>
        <Input
          size="large"
          placeholder="username"
          className="edit-input"
          value={currentEditItem.username}
          disabled={true}
        />
        <label htmlFor="">Name:</label>
        <Input
          size="large"
          placeholder="name"
          className="edit-input second-input"
          value={editName}
          onChange={handleNameChange}
          required={true}
        />
        <label htmlFor="">Password:</label>
        <Input.Password
          size="large"
          placeholder="password"
          className="edit-input second-input"
          value={editPassword}
          onChange={handlePasswordChange}
        />
        <div className="modal-action">
          <Button className="edit-btn" onClick={handleCancelEdit}>
            Huỷ
          </Button>
          <Button type="primary" className="edit-btn" onClick={handleEdit}>
            Sửa User
          </Button>
        </div>
      </Modal>
    </StylesUserManager>
  );
}
