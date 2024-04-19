import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { StylesUserLayout } from "@/layout/userLayout/style/index";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StylesUserLayout>
      <div className="user-layout">
        <UserNavbar />
        {children}
      </div>
    </StylesUserLayout>
  );
}
