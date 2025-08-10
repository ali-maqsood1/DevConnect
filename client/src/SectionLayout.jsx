import { Outlet } from "react-router-dom";
import Alert from "./components/layout/Alert";

export default function SectionLayout() {
  return (
    <section className="container">
        <Alert />
        <Outlet />
    </section>
  );
}
