import React, { useState, ReactNode } from "react";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";

interface Tab {
  label: string;
  component: ReactNode;
}

interface TabSwitcherProps {
  tabs: Tab[];
  onTabChange?: (index: number) => void;
  noSliding?: boolean;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  onTabChange,
  noSliding,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    if (activeTabIndex !== index) {
      setActiveTabIndex(index);
      onTabChange?.(index);
    }
  };

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeTabIndex < tabs.length - 1 && !noSliding) {
        const newIndex = activeTabIndex + 1;
        setActiveTabIndex(newIndex);
        onTabChange?.(newIndex);
      }
    },
    onSwipedRight: () => {
      if (activeTabIndex > 0 && !noSliding) {
        const newIndex = activeTabIndex - 1;
        setActiveTabIndex(newIndex);
        onTabChange?.(newIndex);
      }
    },
    trackTouch: true,
    trackMouse: true,
    delta: 10,
  });

  let paddingClasses = "px-4 py-3";
  if (tabs.length === 2) {
    paddingClasses = "px-12 py-3";
  } else if (tabs.length === 3) {
    paddingClasses = "px-4 py-3";
  } else if (tabs.length === 1) {
    paddingClasses = "px-12 py-3";
  } else {
    paddingClasses = "px-4 py-2";
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Tabs Header */}
      <div className="flex px-4 py-3 bg-white sticky top-0 w-full z-50">
        <div className="flex flex-1 py-1 rounded-xl justify-between items-center bg-graybackground">
          {tabs.map((tab, index) => (
            <div
              key={tab.label}
              className="flex-1 flex justify-center items-center relative cursor-pointer"
              onClick={() => handleTabClick(index)}>
              {/* Vertical Separator */}
              {index !== 0 && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-8 border-l border-graySoft z-10"></div>
              )}
              {/* Tab Label */}
              <span
                className={`mx-1 text-[14px] font-medium ${paddingClasses} text-center rounded-xl transition-all duration-300 ${
                  activeTabIndex === index
                    ? "bg-lightBlue text-black" // Active tab colors
                    : "bg-transparent text-graySoft" // Inactive tab colors
                } flex items-center justify-center relative z-0`}>
                {tab.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div
        className="bg-white flex-grow overflow-y-auto relative"
        {...handlers}>
        {tabs[activeTabIndex] && tabs[activeTabIndex].component}
      </div>
    </div>
  );
};

export default TabSwitcher;
