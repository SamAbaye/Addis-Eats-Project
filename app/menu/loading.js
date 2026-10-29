export default function Loading() {
  return <MenuSkeleton />;
}

function MenuSkeleton() {
  return (
    <div className="menu">
      <div className="menu-item skeleton"></div>
      <div className="menu-item skeleton"></div>
      <div className="menu-item skeleton"></div>
      <div className="menu-item skeleton"></div>
      <div className="menu-item skeleton"></div>
      <div className="menu-item skeleton"></div>
    </div>
  );
}