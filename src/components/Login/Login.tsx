import { StylesLogin } from "@/components/Login/style/index";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";

import { Input, Checkbox, Button, Form } from "antd";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import routes from "@/config/routes";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    navigate(routes.dashboard);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <StylesLogin>
      <div className="login">
        <div className="login-header">
          <img src="/src/assets/images/image 1abc.svg" alt="" />
        </div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="form-login"
        >
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              size="large"
              placeholder="username"
              prefix={<UserOutlined className="login-logo" />}
              className="login-input"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="password"
              prefix={<UnlockOutlined className="login-logo" />}
              className="login-input second-input"
            />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-btn">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </StylesLogin>
  );
}
