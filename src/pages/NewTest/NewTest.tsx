import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { StylesNewTest } from "@/pages/NewTest/index";
import { Checkbox, Input, Select } from "antd";

export default function NewTest() {
  return (
    <StylesNewTest>
      <div className="user-manager">
        <DrawerSide name="Test Manager">
          <UserNavbar classID={true} />
        </DrawerSide>
        <div className="manager-content">
          <h3 className="manager-heading">Thêm mới test</h3>
          <h3>{"Home > Test quiz manager > new test"}</h3>
          <Input addonBefore="Test name:" />
          <div className="new-test-action">
            <Input addonBefore="Time:" />
            <div className="test-select">
              <label htmlFor="">Độ khó:</label>
              <Select
                defaultValue="disabled"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "disabled", label: "Select", disabled: true },
                  { value: 0, label: "Dễ" },
                  { value: 1, label: "Vừa" },
                  { value: 2, label: "Khó" },
                ]}
              />
            </div>
            <div className="test-select">
              <div className="test-select">
                <label htmlFor="">Nhóm câu hỏi:</label>
                <Select
                  defaultValue="disabled"
                  style={{ width: 120 }}
                  // onChange={handleChange}
                  options={[
                    { value: "disabled", label: "Select", disabled: true },
                    { value: 0, label: "Dễ" },
                    { value: 1, label: "Vừa" },
                    { value: 2, label: "Khó" },
                  ]}
                />
              </div>
              <Checkbox>Đảo câu hỏi</Checkbox>
            </div>
          </div>
        </div>
      </div>
    </StylesNewTest>
  );
}
