export const findMatchedMenuItemByPathname = (items, pathname) => {
  return items.find((item) => item.url === pathname);
};

export const findRelatedMatchedMenuItemByPathname = (items, pathname) => {
  return items.find((item) => pathname.includes(item.url));
};

export const findRelatedMenuItemsByMatchedMenuItem = (
  matchedItem,
  items = [],
) => {
  const menuItems = [];

  items.forEach((item) => {
    if (matchedItem.key === item.key) {
      menuItems.push(item);
    }
  });

  return menuItems;
};
