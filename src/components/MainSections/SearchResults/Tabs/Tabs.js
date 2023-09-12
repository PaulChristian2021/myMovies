export default function Tabs({
  tabs,
  clickHandler,
  className,
  tabsClassName,
  activeTab,
}) {
  const style = { filter: "invert(1)" };
  return (
    <ul className={className} style={{ display: "flex" }}>
      {tabs.map((tab) => (
        <li
          className={tabsClassName}
          style={activeTab === tab.name ? style : {}}
          key={tab.name}
          onClick={() => clickHandler(tab.name)}
        >
          {tab.name}
        </li>
      ))}
    </ul>
  );
}
