import { type RefObject, useCallback, useState } from 'react';

type Params = {
  containerRef: RefObject<HTMLDivElement | null>;
  bunRef: RefObject<HTMLHeadingElement | null>;
  mainRef: RefObject<HTMLHeadingElement | null>;
  sauceRef: RefObject<HTMLHeadingElement | null>;
};

type BurgerIngredientsTabsController = {
  selectedTab: string;
  handleSelectTab: (tab: string) => void;
  handleContainerScroll: () => void;
};

export function useBurgerIngredientsTabsController({
  containerRef,
  bunRef,
  mainRef,
  sauceRef,
}: Params): BurgerIngredientsTabsController {
  const [selectedTab, setSelectedTab] = useState('bun');

  const handleScrollIntoView = useCallback((ref: RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSelectTab = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
      switch (tab) {
        case 'bun':
          handleScrollIntoView(bunRef);
          break;
        case 'main':
          handleScrollIntoView(mainRef);
          break;
        case 'sauce':
          handleScrollIntoView(sauceRef);
          break;
        default:
          break;
      }
    },
    [handleScrollIntoView, setSelectedTab]
  );

  const handleContainerScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.getBoundingClientRect().top;

    const entries = [
      { ref: bunRef, tab: 'bun' },
      { ref: mainRef, tab: 'main' },
      { ref: sauceRef, tab: 'sauce' },
    ];

    let closestTab = 'bun';
    let minDistance: number | undefined = undefined;

    entries.forEach(({ ref, tab }) => {
      if (!ref.current) return;

      const distance = Math.abs(ref.current.getBoundingClientRect().top - containerTop);
      if (minDistance === undefined || distance < minDistance) {
        minDistance = distance;
        closestTab = tab;
      }
    });

    setSelectedTab(closestTab);
  }, []);

  return {
    selectedTab,
    handleSelectTab,
    handleContainerScroll,
  };
}
