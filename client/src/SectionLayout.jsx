import { Outlet } from "react-router-dom";

export default function SectionLayout() {
  return (
    <section className="container">
      <Outlet />
    </section>
  );
}
