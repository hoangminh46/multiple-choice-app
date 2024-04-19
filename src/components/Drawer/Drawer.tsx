import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";
import { StylesDrawer } from "@/components/Drawer/styles/index";

export default function DrawerSide({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <StylesDrawer>
      <Space className="drawer-space">
        <Button type="primary" onClick={showDrawer} className="drawer-btn">
          <img src="/src/assets/images/btnmenu.svg" alt="" />
        </Button>
        <p>{name}</p>
      </Space>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"left"}
      >
        {children}
      </Drawer>
    </StylesDrawer>
  );
}
